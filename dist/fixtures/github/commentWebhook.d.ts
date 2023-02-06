import { IssueCommentEvent } from "@octokit/webhooks-types";
export declare function getCommentWebhookPayload(params: {
    body: string;
    login: string;
    org: string;
    repo: string;
    installation?: {
        id: number;
        node_id: string;
    };
}): IssueCommentEvent;
