import { Response } from "express";
import Assignment from "../models/assignmentSchema";
import { validateQuery } from "../utils/validateQuery";
import pool from "../config/postgre";
import Solution from "../models/solutionSchema";
import axios from "axios";

const runSQLBlock = async (client: any, sql: string) => {
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await client.query(stmt);
  }
};

export const executeQuery = async (req: any, res: Response) => {
  const client = await pool.connect();

  try {
    const { assignmentId } = req.params;
    const { query } = req.body;
    const userId = req.user.id;

    if (!validateQuery(query)) {
      return res.status(401).json({ message: "Invalid query type" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      console.log('im breaking')
      return res.status(400).json({
        message: "Invalid assignment ID",
      });
    }

    await client.query("BEGIN");
    await runSQLBlock(client, assignment.postgreSchema);
    console.log('im breaking2')
    await runSQLBlock(client, assignment.sampleData);
    console.log('im breaking3')
    const start = Date.now();
    const studentResult = await client.query(query);
    const executionTime = Date.now() - start;

    const expectedResult = await client.query(assignment.expectedOutput);
console.log('im breaking4')
    const normalize = (rows: any[]) =>
      JSON.stringify(
        rows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
      );
console.log('im breaking5')
    const isCorrect =
      normalize(studentResult.rows) === normalize(expectedResult.rows);

    await client.query("ROLLBACK");
console.log('im breaking6')
    await Solution.create({
      userId,
      Assignment: assignmentId,
      submittedQuery: query,
      executionResult: studentResult.rows,
      isCorrect,
    });
console.log('im breaking7')
    return res.status(200).json({
      columns: studentResult.fields.map((f: any) => f.name),
      rowCount: studentResult.rowCount,
      rows: studentResult.rows,
      executionTime,
      isCorrect,
      message: "Result received",
    });
  } catch (error: any) {
    console.log(error);
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: error.message,
    });
  } finally {
    client.release();
  }
};

export const getUserSolution = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const solutions = await Solution.find({ userId })
      .populate("assignmentId", "title description difficulty ")
      .select(" submittedQuery executionResult isCorrect createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: solutions.length,
      solutions,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const getHint = async (req: any, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { query } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(400).json({
        message: "Invalid Assignment ID",
      });
    }

    const prompt = `
You are a SQL tutor.
Give a short conceptual hint in 25-30 words.
Do NOT provide the final SQL query or answer.

Problem:
${assignment.question}

User Attempt:
${query}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.4,
        },
      }
    );

    return res.json({
      hint: response.data.response,
    });

  } catch (error: any) {
    console.error("OLLAMA ERROR:", error?.message);
    return res.status(500).json({
      message: "Hint generation failed",
    });
  }
};
