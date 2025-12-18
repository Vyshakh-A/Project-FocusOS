import { createTaskService, getTaskService } from "../services/TaskService.js";

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
