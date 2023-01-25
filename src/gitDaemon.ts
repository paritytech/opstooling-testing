import { ChildProcess, execFile, spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";

const execFilePromise = promisify(execFile);

export function getGitUrl(port: number): string {
  return `git://localhost:${port}`;
}

export function getRootPath(dataDir: string, name: string): string {
  return path.join(dataDir, `test-git-${name}`);
}

export function getRepoPath(dataDir: string, gitDaemonName: string, owner: string, repo: string): string {
  return path.join(getRootPath(dataDir, gitDaemonName), owner, repo);
}

export async function startDaemon(name: string, port: number, dataDir: string): Promise<ChildProcess> {
  const daemonRootPath = getRootPath(dataDir, name);

  await fs.mkdir(daemonRootPath, { recursive: true });

  return spawn(
    "git",
    [
      "daemon",
      "--verbose",
      `--port=${port}`,
      `--base-path=${daemonRootPath}`,
      "--export-all",
      "--enable=receive-pack",
      "",
    ],
    { stdio: "pipe" },
  );
}

export type RepoRefs = {
  [name: string]: {
    type: "branch" | "tag";
    sha: string;
  };
};

export async function initRepo(
  rootPath: string,
  owner: string,
  repoName: string,
  additionalBranches: string[],
  additionalTags: string[],
): Promise<RepoRefs> {
  const repoPath = path.join(rootPath, owner, repoName);

  // Scrape repos clean, as we're doing pulls/pushes, and assert on results
  await fs.rm(repoPath, { force: true, recursive: true });
  await fs.mkdir(repoPath, { recursive: true });
  /* potentially we might want to have some meaningful setup for repositories,
     but for now we can pull and force-push to repos of any state */
  await execFilePromise("git", ["init", "--quiet", "-b", "master"], { cwd: repoPath });
  await fs.writeFile(path.join(repoPath, "README.md"), "bump");

  await execFilePromise("git", ["add", "README.md"], { cwd: repoPath });
  await execFilePromise("git", ["commit", "-m", "initial commit"], { cwd: repoPath });

  const repoRefs: RepoRefs = {};
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
    await execFilePromise("git", ["commit", "--allow-empty", "-m", `commit for ${tag}`], { cwd: repoPath });
    await execFilePromise("git", ["tag", tag], { cwd: repoPath });

    repoRefs[tag] = {
      type: "tag",
      sha: (await execFilePromise("git", ["rev-parse", "HEAD"], { cwd: repoPath })).stdout.trim(),
    };
  }

  return repoRefs;
}

/**
 * Like initRepo(), but copies all refs from another repo.
 * By default, copies only default branch, use `additionalBranches` if needed
 */
export async function copyRepo(
  fromUrl: string, // git://localhost:54321/owner/repo.git
  rootPath: string,
  owner: string,
  repoName: string,
  additionalBranches: string[],
): Promise<void> {
  const repoPath = path.join(rootPath, owner, repoName);

  // Scrape repos clean, as we're doing pulls/pushes, and assert on results
  await fs.rm(repoPath, { force: true, recursive: true });

  await execFilePromise("git", ["clone", fromUrl, repoPath]);

  for (const branch of additionalBranches) {
    await execFilePromise("git", ["checkout", branch], { cwd: repoPath });
  }

  // resetting working tree
  await execFilePromise("git", ["checkout", "master"], { cwd: repoPath });
}
