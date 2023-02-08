import { RestEndpointMethodTypes } from "@octokit/rest";
export type Branch = RestEndpointMethodTypes["repos"]["getBranch"]["response"]["data"];
export declare function getBranchPayload(params: {
    name: string;
    commit: string;
    author: string;
    owner: string;
    repo: string;
}): Branch;
