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

export const getTaskService = async (userId, page, limit, filters) => {
  if (!userId) throw new AppError("Unauthorized", 401);

  if (page < 1 || limit < 1) {
    throw new AppError("Invalid pagination values", 400);
  }
  const query = { user: userId, isDeleted: false };

  // ✅ Filtering
  if (filters.completed !== undefined) {
    query.completed = filters.completed === "true";
  }

  if (filters.important !== undefined) {
    query.important = filters.important === "true";
  }

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: "i", // case-insensitive
    };
  }

  const skip = (page - 1) * limit;

  const totalTasks = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalTasks / limit);

  return {
    tasks,
    totalTasks,
    totalPages,
    currentPage: page,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export const updateTaskService = async (userId, taskId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId, isDeleted: false },
    updateData,
    { new: true }
  );

  if (!task) throw new AppError("Task not found or unauthorized", 404);

  return task;
};

export const deleteTaskService = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, isDeleted: false });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.user.toString() !== userId.toString()) {
    throw new AppError("Forbidden", 403);
  }

  task.isDeleted = true;
  await task.save();
};
