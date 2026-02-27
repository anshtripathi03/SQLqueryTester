import mongoose, { mongo } from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    postgreSchema: {
      type: String,
      required: true,
    },
    sampleData: {
      type: String,
      required: true
    }
  },
  { timestamps: true },
);

export default mongoose.model("Assignment", assignmentSchema);
