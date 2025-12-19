import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import AuthRoutes from "./routers/AuthRouter.js"
import errorHandler from "./middleware/errorMiddleware.js";
import taskRoute from "./routers/TaskRouter.js";
import NoteRouter from "./routers/NoteRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/tasks", taskRoute);
app.use("/api/notes", NoteRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${PORT} port.`))

export default app;