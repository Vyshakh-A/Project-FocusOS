import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // GitHub (MANDATORY)
    repoUrl: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    repo: {
      type: String,
      required: true
    },

    // FocusOS-specific
    title: String,
    description: String,
    resources: [resourceSchema],

    // cache control
    lastCheckedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
