import {createTask} from "../controllers/TaskController.js";
import {protect} from "../middleware/AuthMiddleware.js";
import express from "express";

const taskRoute = express.Router();

taskRoute.post("/", protect, createTask);


export default taskRoute;