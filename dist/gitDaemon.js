"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyRepo = exports.initRepo = exports.startDaemon = exports.getRepoPath = exports.getRootPath = exports.getGitUrl = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const execFilePromise = (0, util_1.promisify)(child_process_1.execFile);
function getGitUrl(port) {
    return `git://localhost:${port}`;
}
exports.getGitUrl = getGitUrl;
function getRootPath(dataDir, name) {
    return path_1.default.join(dataDir, `test-git-${name}`);
}
exports.getRootPath = getRootPath;
function getRepoPath(dataDir, gitDaemonName, owner, repo) {
    return path_1.default.join(getRootPath(dataDir, gitDaemonName), owner, repo);
}
exports.getRepoPath = getRepoPath;
async function startDaemon(name, port, dataDir) {
    const daemonRootPath = getRootPath(dataDir, name);
    await fs_1.promises.rm(daemonRootPath, { recursive: true, force: true });
    await fs_1.promises.mkdir(daemonRootPath, { recursive: true });
    return (0, child_process_1.spawn)("git", [
        "daemon",
        "--verbose",
        `--port=${port}`,
        `--base-path=${daemonRootPath}`,
        "--export-all",
        "--enable=receive-pack",
        "",
    ], { stdio: "pipe" });
}
exports.startDaemon = startDaemon;
async function initRepo(rootPath, owner, repoName, additionalBranches, additionalTags) {
    const repoPath = path_1.default.join(rootPath, owner, repoName);
    // Scrape repos clean, as we're doing pulls/pushes, and assert on results
    await fs_1.promises.rm(repoPath, { force: true, recursive: true });
    await fs_1.promises.mkdir(repoPath, { recursive: true });
    /* potentially we might want to have some meaningful setup for repositories,
       but for now we can pull and force-push to repos of any state */
    await execFilePromise("git", ["init", "--quiet", "-b", "master"], { cwd: repoPath });
    await fs_1.promises.writeFile(path_1.default.join(repoPath, "README.md"), "bump");
    // Setting git config for repos, unifying environment across devs and CI
    await execFilePromise("git", ["config", "user.email", "bot@example.com"], { cwd: repoPath });
    await execFilePromise("git", ["config", "user.name", "Robot Tester"], { cwd: repoPath });
    await execFilePromise("git", ["config", "commit.gpgsign", "false"], { cwd: repoPath });
    await execFilePromise("git", ["add", "README.md"], { cwd: repoPath });
    await execFilePromise("git", ["commit", "-m", "initial commit"], { cwd: repoPath });
    const repoRefs = {};
    repoRefs.master = {
        type: "branch",
        sha: (await execFilePromise("git", ["rev-parse", "HEAD"], { cwd: repoPath })).stdout.trim(),
    };
    for (const branch of additionalBranches) {
        await execFilePromise("git", ["checkout", "-b", branch], { cwd: repoPath });
        await execFilePromise("git", ["commit", "--allow-empty", "-m", `commit in ${branch}`], { cwd: repoPath });
        repoRefs[branch] = {
            type: "branch",
            sha: (await execFilePromise("git", ["rev-parse", "HEAD"], { cwd: repoPath })).stdout.trim(),
        };
    }
    for (const tag of additionalTags) {
        // Diverting tags from master, so they wouldn't be copied by `copyRepo`
        await execFilePromise("git", ["checkout", "master"], { cwd: repoPath });
        await execFilePromise("git", ["checkout", "-b", `b-${tag}`], { cwd: repoPath });
        await execFilePromise("git", ["commit", "--allow-empty", "-m", `commit for ${tag}`], { cwd: repoPath });
        await execFilePromise("git", ["tag", tag], { cwd: repoPath });
        repoRefs[tag] = {
            type: "tag",
            sha: (await execFilePromise("git", ["rev-parse", "HEAD"], { cwd: repoPath })).stdout.trim(),
        };
    }
    return repoRefs;
}
exports.initRepo = initRepo;
/**
 * Like initRepo(), but copies all refs from another repo.
 * By default, copies only default branch, use `additionalBranches` if needed
 */
async function copyRepo(fromUrl, // git://localhost:54321/owner/repo.git
rootPath, owner, repoName, additionalBranches) {
    const repoPath = path_1.default.join(rootPath, owner, repoName);
    // Scrape repos clean, as we're doing pulls/pushes, and assert on results
    await fs_1.promises.rm(repoPath, { force: true, recursive: true });
    await execFilePromise("git", ["clone", "-b", "master", "--single-branch", fromUrl, repoPath]);
    for (const branch of additionalBranches) {
        await execFilePromise("git", ["remote", "set-branches", "--add", "origin", branch], { cwd: repoPath });
        await execFilePromise("git", ["fetch", "origin", branch], { cwd: repoPath });
        await execFilePromise("git", ["checkout", branch], { cwd: repoPath });
    }
    // resetting working tree
    await execFilePromise("git", ["checkout", "master"], { cwd: repoPath });
}
exports.copyRepo = copyRepo;
//# sourceMappingURL=gitDaemon.js.map