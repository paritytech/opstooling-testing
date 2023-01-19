import { RestEndpointMethodTypes } from "@octokit/rest";
export type User = RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"];
export declare function getUserPayload(params: {
    id: number;
    login: string;
}): User;
export type GitUser = RestEndpointMethodTypes["repos"]["getBranch"]["response"]["data"]["commit"]["commit"]["committer"];
export declare function getGitUserPayload(params: {
    login: string;
    email: string;
}): GitUser;
