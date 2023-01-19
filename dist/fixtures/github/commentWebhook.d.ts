import { IssueCommentEvent } from "@octokit/webhooks-types";
export declare function getCommentWebhookPayload(params: {
    body: string;
    login: string;
    org: string;
    repo: string;
}): IssueCommentEvent;
