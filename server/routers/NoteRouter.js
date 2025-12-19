import { upsertNoteController, getNoteController } from "../controllers/NoteController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/")
    .post(protect, upsertNoteController);

router.route("/:date")
    .get(protect, getNoteController);
export default router;