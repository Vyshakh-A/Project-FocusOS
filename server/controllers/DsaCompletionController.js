import { advanceUserProgress } from "../services/ProgressService.js";

export const completeDsaController = async (req, res, next) => {
  try {
    await advanceUserProgress(req.user.id);
    res.status(200).json({ message: "DSA marked as completed" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
