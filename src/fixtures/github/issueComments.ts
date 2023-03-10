import { RestEndpointMethodTypes } from "@octokit/rest";

import { getUserPayload } from "./user";

export type IssueComment = RestEndpointMethodTypes["issues"]["createComment"]["response"]["data"];

export function getIssueCommentsPayload(params: {
  org: string;
  repo: string;
  comments: { author: string; body: string; id: number }[];
}): IssueComment[] {
  return params.comments.map((comment) => getIssueCommentPayload({ org: params.org, repo: params.repo, comment }));
}

export function getIssueCommentPayload(params: {
  org: string;
  repo: string;
  comment: { author: string; body: string; id: number };
}): IssueComment {
  return {
    url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/comments/${params.comment.id}`,
    html_url: `https://github.com/${params.org}/${params.repo}/pull/4#issuecomment-${params.comment.id}`,
    issue_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4`,
    id: params.comment.id,
    node_id: "IC_kwDOG7BDBs5FueDP",
    user: getUserPayload({ id: 588262, login: params.comment.author }),
    created_at: "2022-06-29T10:25:43Z",
    updated_at: "2022-06-29T10:25:43Z",
    author_association: "MEMBER",
    body: params.comment.body,
    reactions: {
      url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/comments/${params.comment.id}/reactions`,
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    performed_via_github_app: null,
  };
}
