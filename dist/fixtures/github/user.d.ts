import { RestEndpointMethodTypes } from "@octokit/rest";
import { Committer, User as WebhooksUser } from "@octokit/webhooks-types";
export type User = RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"] & WebhooksUser;
export declare function getUserPayload(params: {
    id?: number;
    login: string;
}): User;
export type GitUser = RestEndpointMethodTypes["repos"]["getBranch"]["response"]["data"]["commit"]["commit"]["committer"] & Committer;
export declare function getGitUserPayload(params: {
    login: string;
    email: string;
}): GitUser;
