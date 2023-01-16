import { RestEndpointMethodTypes } from "@octokit/rest";
import { PullRequestOpenedEvent } from "@octokit/webhooks-types";

import { getRepoPayload } from "./repo";
import { getUserPayload } from "./user";

export type PullRequest = RestEndpointMethodTypes["pulls"]["get"]["response"]["data"];

export function getPullRequestOpenedEventPayload(params: PullRequestParams): PullRequestOpenedEvent {
  const pr = getPullRequestPayload(params) as PullRequestOpenedEvent["pull_request"];

  return { sender: pr.user, action: "opened", number: pr.number, pull_request: pr, repository: pr.base.repo };
}

export type PullRequestParams = {
  login: string;
  org: string;
  repo: string;
  headBranch: string;
  number?: number;
};

export function getPullRequestsPayload(params: PullRequestParams[]): PullRequest[] {
  return params.map(getPullRequestPayload);
}

export function getPullRequestPayload(params: PullRequestParams): PullRequest {
  return {
    url: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4`,
    id: 1008271935,
    node_id: "PR_kwDOG7BDBs48GQI_",
    html_url: `https://github.com/${params.org}/${params.repo}/pull/4`,
    diff_url: `https://github.com/${params.org}/${params.repo}/pull/4.diff`,
    patch_url: `https://github.com/${params.org}/${params.repo}/pull/4.patch`,
    issue_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4`,
    number: params.number ?? 4,
    state: "open",
    locked: false,
    title: "update",
    user: getUserPayload({ id: 588262, login: params.login }),
    body: null,
    created_at: "2022-07-26T09:25:34Z",
    updated_at: "2022-07-26T09:25:34Z",
    closed_at: null,
    merged_at: null,
    merge_commit_sha: "0f9265e362f42f1a84399b6270db9e5c0440934f",
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4/commits`,
    review_comments_url: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4/comments`,
    review_comment_url: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/comments{/number}`,
    comments_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/comments`,
    statuses_url: `https://api.github.com/repos/${params.org}/${params.repo}/statuses/0c84e6dd0ccd531206c8137a2e2e9edaa9907e5d`,
    head: {
      label: `${params.org}:${params.headBranch}`,
      ref: params.headBranch,
      sha: "0c84e6dd0ccd531206c8137a2e2e9edaa9907e5d",
      user: getUserPayload({ id: 588262, login: params.login }),
      repo: getRepoPayload({ name: params.repo, owner: params.org }) as PullRequest["head"]["repo"],
    },
    base: {
      label: `${params.org}:master`,
      ref: "master",
      sha: "d788763294b8094c66620294725edfc3f653a4ff",
      user: getUserPayload({ id: 74720417, login: params.org }),
      repo: getRepoPayload({ name: params.repo, owner: params.org }) as PullRequest["base"]["repo"],
    },
    _links: {
      self: { href: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4` },
      html: { href: `https://github.com/${params.org}/${params.repo}/pull/4` },
      issue: { href: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4` },
      comments: { href: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/comments` },
      review_comments: { href: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4/comments` },
      review_comment: { href: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/comments{/number}` },
      commits: { href: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4/commits` },
      statuses: {
        href: `https://api.github.com/repos/${params.org}/${params.repo}/statuses/0c84e6dd0ccd531206c8137a2e2e9edaa9907e5d`,
      },
    },
    author_association: "MEMBER",
    auto_merge: null,
    active_lock_reason: null,
    merged: false,
    mergeable: true,
    rebaseable: true,
    mergeable_state: "clean",
    merged_by: null,
    comments: 2,
    review_comments: 0,
    maintainer_can_modify: true,
    commits: 1,
    additions: 0,
    deletions: 0,
    changed_files: 1,
  };
}
