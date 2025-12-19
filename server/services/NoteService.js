import Note from "../models/Note.js";
import AppError from "../utils/AppError.js";

export const upsertNoteService = async (userId, date, content) => {
  if (!content) {
    throw new AppError("Note content cannot be empty", 400);
  }

  const note = await Note.findOneAndUpdate(
    { user: userId, date },
    { content },
    { new: true, upsert: true }
  );

  return note;
};

export const getNoteService = async (userId, date) => {
  const note = await Note.findOne({
    user: userId,
    date,
    isDeleted: false,
  });

  return note;
};
