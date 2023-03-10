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

  await fs.rm(daemonRootPath, { recursive: true, force: true });

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

  // Setting git config for repos, unifying environment across devs and CI
  await execFilePromise("git", ["config", "user.email", "bot@example.com"], { cwd: repoPath });
  await execFilePromise("git", ["config", "user.name", "Robot Tester"], { cwd: repoPath });
  await execFilePromise("git", ["config", "commit.gpgsign", "false"], { cwd: repoPath });

  // Enabling receive on master
  await execFilePromise("git", ["config", "receive.denyCurrentBranch", "updateInstead"], { cwd: repoPath });

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

  await execFilePromise("git", ["clone", "-b", "master", "--single-branch", fromUrl, repoPath]);

  for (const branch of additionalBranches) {
    await execFilePromise("git", ["remote", "set-branches", "--add", "origin", branch], { cwd: repoPath });
    await execFilePromise("git", ["fetch", "origin", branch], { cwd: repoPath });
    await execFilePromise("git", ["checkout", branch], { cwd: repoPath });
  }

  // Resetting working tree
  await execFilePromise("git", ["checkout", "master"], { cwd: repoPath });

  // Enabling receive on master
  await execFilePromise("git", ["config", "receive.denyCurrentBranch", "updateInstead"], { cwd: repoPath });
}
