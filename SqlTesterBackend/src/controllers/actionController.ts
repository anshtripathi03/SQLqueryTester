import { Request, Response } from "express";
import Assignment from "../models/assignmentSchema";
import { validateQuery } from "../utils/validateQuery";
import pool from "../config/postgre";
import Solution from "../models/solutionSchema";
import { openai } from "../config/openai";
import {Types} from "mongoose";

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
    const result = await pool.query(query);
    await pool.query("ROLLBACK");

    await Solution.create({
      userId,
      Assignment: assignmentId,
      submittedQuery: query,
      executionResult: result.rows,
    });

    return res.status(200).json({
      rows: result.rows,
      message: " result received ",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};

export const getUserSolution = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const solutions = await Solution.find({ userId })
      .populate("assignmentId", "title description difficulty isCorrect")
      .select(" submittedQuery executionResult createdAt")
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

export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.query;

    const allowed = ["Easy", "Medium", "Hard"];

    if (difficulty && !allowed.includes(difficulty as string)) {
      return res.status(400).json({
        message: "Invalid difficulty filter",
      });
    }

    const filter: any = {};

    if (difficulty) {
      filter.difficulty = difficulty;
    } else {
      filter.difficulty = "Easy";
    }

    const assignments = await Assignment.find(filter)
      .select("_id assignmentId title description difficulty")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: assignments.length,
      assignments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};

export const getAssignment = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params ;

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid assignment ID format",
      });
    }

    const assignment = await Assignment.findById(id).select(
      "_id title description difficulty question postgreSchema"
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      assignment,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message
    })
  }
}
