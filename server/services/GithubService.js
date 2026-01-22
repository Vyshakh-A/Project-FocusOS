import axios from "axios";
import AppError from "../utils/AppError.js";

const githubClient = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    timeout: 5000, // 5 second timeout
});

export const fetchRepoActivity = async (owner, repo) => {
    try {
        // latest commit
        const latestRes = await githubClient.get(
            `/repos/${owner}/${repo}/commits`,
            { params: { per_page: 1 } },
        );

        const latestCommit = latestRes.data[0];
        if (!latestCommit) {
            return { lastCommitAt: null, commits48h: 0 };
        }

        // commits in last 48h
        const since = new Date(Date.now() - 48 * 60 * 60 * 1000);

        const recentRes = await githubClient.get(
            `/repos/${owner}/${repo}/commits`,
            { params: { since: since.toISOString() } },
        );

        return {
            lastCommitAt: latestCommit.commit.author.date,
            commits48h: recentRes.data.length,
        };
    } catch (err) {
        if (err.response?.status === 404) {
            throw new AppError("GitHub repository not found", 404);
        }
        if (err.response?.status === 403) {
            throw new AppError("GitHub rate limit exceeded", 429);
        }
        throw new AppError("Failed to fetch GitHub activity", 500);
    }
};
