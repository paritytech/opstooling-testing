import { RestEndpointMethodTypes } from "@octokit/rest";
import { PullRequestOpenedEvent } from "@octokit/webhooks-types";
export type PullRequest = RestEndpointMethodTypes["pulls"]["get"]["response"]["data"];
export declare function getPullRequestOpenedEventPayload(params: PullRequestParams): PullRequestOpenedEvent;
export type PullRequestParams = {
    login: string;
    org: string;
    repo: string;
    headBranch: string;
    number?: number;
};
export declare function getPullRequestsPayload(params: PullRequestParams[]): PullRequest[];
export declare function getPullRequestPayload(params: PullRequestParams): PullRequest;
