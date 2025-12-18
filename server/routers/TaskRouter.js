import {createTask, getTask} from "../controllers/TaskController.js";
import {protect} from "../middleware/AuthMiddleware.js";
import express from "express";

const taskRoute = express.Router();

taskRoute.route("/")
    .post(protect, createTask)
    .get(protect, getTask)


export default taskRoute;