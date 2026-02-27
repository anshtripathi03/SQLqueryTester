import { Request, Response } from "express";
import Assignment from "../models/assignmentSchema";
import {Types} from "mongoose";

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