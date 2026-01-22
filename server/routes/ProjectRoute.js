// routes/ProjectRoute.js
import express from "express";
import  protect  from "../middleware/AuthMiddleware.js";
import {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject
} from "../controllers/ProjectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.get("/:id", protect, getProjectById);
router.patch("/:id", protect, updateProject);

export default router;
