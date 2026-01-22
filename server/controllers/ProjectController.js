// controllers/ProjectController.js
import * as ProjectService from "../services/ProjectService.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await ProjectService.create(req.user.id, req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getMyProjects = async (req, res, next) => {
  try {
    const projects = await ProjectService.getAll(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await ProjectService.getOne(req.user.id, req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await ProjectService.update(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(project);
  } catch (err) {
    next(err);
  }
};
