import { compare } from "bcryptjs";
import {
  createTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/TaskService.js";

export const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskData = req.body;

    const task = await createTaskService(userId, taskData);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (e) {
    next(e);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const filters = {
      completed: req.query.completed,
      important: req.query.important,
      search: req.query.search,
    }

    const tasks = await getTaskService(userId, page, limit, filters);

    res.status(200).json({
      message: "Task retrived successfully",
      tasks,
    });
  } catch (e) {
    next(e);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTask = await updateTaskService(userId, taskId, updateData);

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    await deleteTaskService(userId, taskId);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
