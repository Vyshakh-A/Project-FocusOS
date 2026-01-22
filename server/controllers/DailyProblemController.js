import { getTodayDsaForUser } from "../services/DailyProblemService.js";

export const getTodayDsaController = async (req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware

    const problem = await getTodayDsaForUser(userId);

    res.status(200).json(problem);
  } catch (error) {
    next(error);
  }
};
