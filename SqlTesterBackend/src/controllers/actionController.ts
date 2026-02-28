import { Response } from "express";
import Assignment from "../models/assignmentSchema";
import { validateQuery } from "../utils/validateQuery";
import pool from "../config/postgre";
import Solution from "../models/solutionSchema";
import { openai } from "../config/openai";

export const executeQuery = async (req: any, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { query } = req.body;
    const userId = req.user.id;

    if (!validateQuery(query)) {
      return res.status(400).json({ message: "Invalid query type" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(400).json({
        message: "Invalid assignment ID",
      });
    }

    await pool.query("BEGIN");
    const start = Date.now();
    const result = await pool.query(query);
    const executionTime = Date.now() - start;
    await pool.query("ROLLBACK");

    await Solution.create({
      userId,
      Assignment: assignmentId,
      submittedQuery: query,
      executionResult: result.rows,
    });

    return res.status(200).json({
      columns: result.fields.map((f: any) => f.name),
      rowCount: result.rowCount,
      rows: result.rows,
      executionTime,
      message: " result received ",
    });

  } catch (error: any) {
    return res.status(500).json({
      message: "Query execution failed",
    });
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
    console.log("Hint assignmentId:", assignmentId);

    if (!assignment) {
      return res.status(400).json({
        message: "Invalid Assignment ID",
      });
    }

    const prompt = `You are a SQL tutor.
  Give a helpful hint for solving the following SQL problem.
  DO NOT provide the final query.
  Guide the student conceptually.

  Problem:
    ${assignment.question}

  User Attempt:
    ${query}
  `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return res.json({
      hint: response.choices[0].message.content,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};
