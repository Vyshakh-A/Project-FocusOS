import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

export const createTask = async (userId, taskData) => {
  if (!taskData.title) throw new AppError("Title is required", 400);

  const task = await Task.create({
    ...taskData,
    user: userId,
  });
  return task;
};

export const getTask = async (userId) => {
  const tasks = await Task.find({ user: userId });
  return tasks;
};

export const getTodaysTask = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    user: userId,
    duetime: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).sort({ createdAt: -1 });

  return tasks;
};

export const updateTask = async (userId, taskId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updateData,
    { new: true }
  );

  if (!task) throw new AppError("Task not found or unauthorized", 404);

  return task;
};

export const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (!task) throw new AppError("Task not found or unauthorized", 404);

  return "Task deleted successfully";
};
