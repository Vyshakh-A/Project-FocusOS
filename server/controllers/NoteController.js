import { upsertNoteService, getNoteService } from "../services/NoteService.js";

export const upsertNoteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const note = await upsertNoteService(userId, date, content);
    
    res.status(200).json({
      message: "Note saved",
      note,
    });
  } catch (error) {
    next(error);
  }
};


export const getNoteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.params.date;
    const note = await getNoteService(userId, date);

    res.status(200).json({
      message: "Note retrieved successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
}