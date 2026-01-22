import UserProgress from "../models/UserProgress.js";

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const TOPIC_ORDER = ["Arrays", "Strings", "HashMap", "Stack", "Sliding Window"];

export const advanceUserProgress = async (userId) => {
  const progress = await UserProgress.findOne({ userId });

  if (!progress) {
    throw new Error("User progress not found");
  }

  const now = new Date();

  // ✅ COMPLETION GUARD
  if (progress.lastCompletedAt && isSameDay(progress.lastCompletedAt, now)) {
    throw new Error("Today's problem already completed");
  }

  // advance rotation
  progress.rotationIndex += 1;

  // topic switch rule
  if (progress.rotationIndex > 3) {
    const currentIndex = TOPIC_ORDER.indexOf(progress.topic); // Array -> 0
    progress.topic = TOPIC_ORDER[(currentIndex + 1) % TOPIC_ORDER.length]; //1 % 5 = 1
    progress.rotationIndex = 1;
  }

  progress.lastCompletedAt = now;
  await progress.save();
};
