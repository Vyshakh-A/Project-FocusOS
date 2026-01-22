export default function parseGithubUrl(url) {
    try {
        const parsed = new URL(url);
        let pathname = parsed.pathname.replace("/", "").split("/");
        let [owner, repo] = pathname;

        if (!owner || !repo) throw new Error();

        // Remove .git suffix if present
        repo = repo.replace(/\.git$/, "");

        return { owner, repo };
    } catch {
        throw new Error("Invalid GitHub repository URL");
    }
}
