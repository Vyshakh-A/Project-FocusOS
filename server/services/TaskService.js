import Task from "../models/Task.js";
import AppError from "../utils/AppError.js"

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
