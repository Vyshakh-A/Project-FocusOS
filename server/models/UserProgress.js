import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    topic: { type: String, default: "Arrays" },
    rotationIndex: { type: Number, default: 1 },
    lastCompletedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("UserProgress", userProgressSchema);
