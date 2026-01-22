//necessary imports for developments
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

//imports for routes
import AuthRoute from "./routes/AuthRoute.js";
import TaskRoute from "./routes/TaskRoute.js";
import DailyProblemRoute from "./routes/DailyProblemRoute.js";
import projectRoute from "./routes/ProjectRoute.js";

//importing error handler middleware
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Validate environment variables
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI environment variable is not set");
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("Error: JWT_SECRET environment variable is not set");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

//defining routes
app.use("/api/auth", AuthRoute);
app.use("/api/tasks", TaskRoute);
app.use("/api/dsa", DailyProblemRoute);
app.use("/api/projects", projectRoute);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Error handler middleware - MUST be after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
