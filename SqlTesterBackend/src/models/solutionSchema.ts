import mongoose, { mongo } from "mongoose";
import User from "./userSchema";
import Assignment from "./assignmentSchema";

const solutionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    Assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Assignment,
      required: true,
    },
    submittedQuery: {
      type: String,
      required: true,
    },
    executionResult: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Solutions", solutionSchema);
