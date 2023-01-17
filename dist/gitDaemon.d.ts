/// <reference types="node" />
import { ChildProcess } from "child_process";
export declare function getGitUrl(port: number): string;
export declare function getRootPath(dataDir: string, name: string): string;
export declare function getRepoPath(dataDir: string, gitDaemonName: string, owner: string, repo: string): string;
export declare function startDaemon(name: string, port: number, dataDir: string): Promise<ChildProcess>;
export type RepoRefs = {
    [name: string]: {
        type: "branch" | "tag";
        sha: string;
    };
};
export declare function initRepo(rootPath: string, owner: string, repoName: string, additionalBranches: string[]): Promise<RepoRefs>;
/**
 * Like initRepo(), but copies all refs from another repo.
 * By default, copies only default branch, use `additionalBranches` if needed
 */
export declare function copyRepo(fromUrl: string, // git://localhost:54321/owner/repo.git
rootPath: string, owner: string, repoName: string, additionalBranches: string[]): Promise<void>;
