import { RestEndpointMethodTypes } from "@octokit/rest";
export type IssueComment = RestEndpointMethodTypes["issues"]["createComment"]["response"]["data"];
export declare function getIssueCommentsPayload(params: {
    org: string;
    repo: string;
    comments: {
        author: string;
        body: string;
        id: number;
    }[];
}): IssueComment[];
export declare function getIssueCommentPayload(params: {
    org: string;
    repo: string;
    comment: {
        author: string;
        body: string;
        id: number;
    };
}): IssueComment;
