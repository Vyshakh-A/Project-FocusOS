import {
    createTask,
    getTask,
    getTodaysTask,
    updateTask,
    deleteTask,
} from "../services/TaskService.js";

export const createTaskController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const taskData = req.body;

        const task = await createTask(userId, taskData);

        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const tasks = await getTask(userId);

        res.status(200).json({
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const getTodaysTasksController = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const tasks = await getTodaysTask(userId);

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        const updateData = req.body;

        const update = await updateTask(userId, taskId, updateData);

        res.status(200).json({
            message: "Task updated successfully",
            update,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaskController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;

        const msg = await deleteTask(userId, taskId);

        res.status(200).json({
            message: msg,
        });
    } catch (error) {
        next(error);
    }
};
