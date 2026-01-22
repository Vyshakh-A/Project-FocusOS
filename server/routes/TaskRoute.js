import express from "express";
import protect from "../middleware/AuthMiddleware.js"
import {
    createTaskController as createTask,
    getTaskController as getTask,
    getTodaysTasksController as getTodaysTask,
    updateTaskController as updateTask,
    deleteTaskController as deleteTask,
} from "../controllers/TaskController.js";


const router = express.Router();

router.route('/')
    .post(protect, createTask)
    .get(protect, getTask)

router.get('/today', protect, getTodaysTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;