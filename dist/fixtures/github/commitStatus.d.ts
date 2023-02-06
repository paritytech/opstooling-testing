import { RestEndpointMethodTypes } from "@octokit/rest";
export type CommitStatus = RestEndpointMethodTypes["repos"]["createCommitStatus"]["response"]["data"];
export declare function createCommitStatusResponsePayload(params: {
    owner: string;
    repo: string;
    sha: string;
    context?: string;
    state?: string;
    creator?: string;
}): CommitStatus;
