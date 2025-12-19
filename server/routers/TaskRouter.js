import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";

const taskRoute = express.Router();

taskRoute.route("/")
        .post(protect, createTask)
        .get(protect, getTask);

taskRoute.route("/:id")
        .put(protect, updateTask)
        .delete(protect, deleteTask);

export default taskRoute;
