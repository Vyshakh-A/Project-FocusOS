import {createTaskService} from "../services/TaskService.js"

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
