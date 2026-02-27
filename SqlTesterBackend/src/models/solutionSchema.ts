import mongoose, { mongo } from "mongoose";
import userSchema from "./userSchema";
import assignmentSchema from "./assignmentSchema";

const solutionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchema,
      required: true,
    },
    Assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: assignmentSchema,
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
