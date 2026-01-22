import DailyProblem from "../models/DailyProblem.js";
import UserProgress from "../models/UserProgress.js";
import AppError from "../utils/AppError.js";

const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const getTodayDsaForUser = async (userId) => {
    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
        progress = await UserProgress.create({
            userId,
            topic: "Arrays",
            rotationIndex: 1,
            lastCompletedAt: null,
        });
    }

    const now = new Date();

    if (progress.lastCompletedAt && isSameDay(progress.lastCompletedAt, now)) {
        throw new AppError("Today's DSA already completed", 400);
    }

    // Fetch problem based on current state
    const problem = await DailyProblem.findOne({
        topic: progress.topic,
        rotationIndex: progress.rotationIndex,
    }).lean();

    if (!problem) {
        throw new AppError("DSA problem not found for current rotation", 404);
    }

    return problem;
};
