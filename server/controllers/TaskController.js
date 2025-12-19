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

    const tasks = await getTaskService(userId);

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

    const deletedTask = await deleteTaskService(userId, taskId);

    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (e) {
    next(e);
  }
};
