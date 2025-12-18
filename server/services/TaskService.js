import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

export const createTaskService = async (userId, taskData) => {
  if (!taskData.title) throw new AppError("Task title is required", 400);

  const task = await Task.create({
    user: userId,
    title: taskData.title,
    description: taskData.description || "",
    completed: taskData.completed || false,
    important: taskData.important || false,
  });

  return task;
};

export const getTaskService = async (userId) => {
  if (!userId) throw new AppError("Unauthorized", 401);

  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

  return tasks;
};
