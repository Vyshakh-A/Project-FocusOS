import express from "express";
import { getTodayDsaController } from "../controllers/DailyProblemController.js";
import { completeDsaController } from "../controllers/DsaCompletionController.js";
import protect  from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/today", protect, getTodayDsaController);
router.post("/complete", protect, completeDsaController);


export default router;
