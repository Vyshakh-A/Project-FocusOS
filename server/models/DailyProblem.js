import mongoose from "mongoose";

const dailyProblemSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true },
        topic: { type: String, required: true },
        insight: { type: String, required: true },
        leetcodeUrl: { type: String, required: true },
        understandPrompts: { type: [String], default: [] },
        rotationIndex: { type: Number, required: true },
    },
    { timestamps: true }
);

dailyProblemSchema.index({ topic: 1, rotationIndex: 1 }, { unique: true });

export default mongoose.model("DailyProblem", dailyProblemSchema);
