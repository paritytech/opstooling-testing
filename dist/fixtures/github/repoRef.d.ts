import { RestEndpointMethodTypes } from "@octokit/rest";
export type RepoRef = RestEndpointMethodTypes["git"]["getRef"]["response"]["data"];
export type RepoRefParams = {
    /** @example "refs/heads/master", "refs/tags/v1.0.0" */
    ref: string;
    commit: string;
    owner: string;
    repo: string;
    node_id?: string;
};
export declare function getRepoRefPayload(params: RepoRefParams): RepoRef;
export declare function getRepoRefsPayload(params: RepoRefParams[]): RepoRef[];
