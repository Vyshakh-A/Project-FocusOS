import Project from "../models/Project.js";
import parseGithubUrl from "../utils/parseGithubUrl.js";
import isActive from "../utils/isActive.js";
import { fetchRepoActivity } from "./GithubService.js";
import AppError from "../utils/AppError.js";

const CACHE_WINDOW = 30 * 60 * 1000; // 30 min

export const create = async (userId, data) => {
    if (!data.repoUrl) {
        throw new AppError("GitHub repository is required", 400);
    }

    // Validate inputs
    if (typeof data.title !== "string" || data.title.length > 200) {
        throw new AppError("Title must be a string (max 200 chars)", 400);
    }
    if (
        data.description &&
        (typeof data.description !== "string" || data.description.length > 1000)
    ) {
        throw new AppError(
            "Description must be a string (max 1000 chars)",
            400,
        );
    }
    if (data.resources && !Array.isArray(data.resources)) {
        throw new AppError("Resources must be an array", 400);
    }

    const { owner, repo } = parseGithubUrl(data.repoUrl);

    const project = await Project.create({
        userId,
        repoUrl: data.repoUrl,
        owner,
        repo,
        title: data.title,
        description: data.description,
        resources: data.resources || [],
    });

    return project;
};

export const getAll = async (userId) => {
    const projects = await Project.find({ userId }).lean();

    return Promise.all(
        projects.map(async (project) => {
            let activity = null;

            const shouldFetch =
                !project.lastCheckedAt ||
                Date.now() - new Date(project.lastCheckedAt).getTime() >
                    CACHE_WINDOW;

            if (shouldFetch) {
                try {
                    activity = await fetchRepoActivity(
                        project.owner,
                        project.repo,
                    );
                } catch (err) {
                    // Cache the failure to prevent retry storm
                    activity = { lastCommitAt: null, commits48h: 0 };
                    // Don't throw - return gracefully with null activity
                }

                // Update lastCheckedAt after fetch completes
                await Project.updateOne(
                    { _id: project._id },
                    { lastCheckedAt: new Date() },
                );
            }

            return {
                ...project,
                isActive: activity?.lastCommitAt
                    ? isActive(activity.lastCommitAt)
                    : false,
                activity,
            };
        }),
    );
};

export const getOne = async (userId, projectId) => {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) throw new AppError("Project not found", 404);
    return project;
};

export const update = async (userId, projectId, data) => {
    const project = await Project.findOneAndUpdate(
        { _id: projectId, userId },
        {
            title: data.title,
            description: data.description,
            resources: data.resources,
        },
        { new: true },
    );

    if (!project) throw new AppError("Project not found", 404);
    return project;
};
