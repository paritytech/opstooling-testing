import { IssueCommentEvent } from "@octokit/webhooks-types";

import { getOrgPayload } from "./org";
import { getRepoPayload } from "./repo";
import { getUserPayload } from "./user";

export function getCommentWebhookPayload(params: {
  body: string;
  login: string;
  issueAuthorLogin?: string;
  org: string;
  repo: string;
  installation?: {
    id: number;
    node_id: string;
  };
}): IssueCommentEvent {
  const installation = params.installation ?? {
    id: 25299948,
    node_id: "MDIzOkludGVncmF0aW9uSW5zdGFsbGF0aW9uMjUyOTk5NDg=",
  };

  const issueAuthorUser = getUserPayload({ login: params.issueAuthorLogin ?? params.login });

  return {
    action: "created",
    issue: {
      url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4`,
      repository_url: `https://api.github.com/repos/${params.org}/${params.repo}`,
      labels_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/labels{/name}`,
      comments_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/comments`,
      events_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/events`,
      html_url: `https://github.com/${params.org}/${params.repo}/pull/4`,
      id: 1359117232,
      node_id: "PR_kwDOHQICPM4-OcPh",
      number: 4,
      title: "Test PR",
      user: issueAuthorUser,
      labels: [],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 2,
      created_at: "2022-09-01T16:32:21Z",
      updated_at: "2022-09-01T16:46:52Z",
      closed_at: null,
      author_association: "MEMBER",
      active_lock_reason: null,
      draft: false,
      pull_request: {
        url: `https://api.github.com/repos/${params.org}/${params.repo}/pulls/4`,
        html_url: `https://github.com/${params.org}/${params.repo}/pull/4`,
        diff_url: `https://github.com/${params.org}/${params.repo}/pull/4.diff`,
        patch_url: `https://github.com/${params.org}/${params.repo}/pull/4.patch`,
        merged_at: null,
      },
      body: null,
      reactions: {
        url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/reactions`,
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
      timeline_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4/timeline`,
      performed_via_github_app: null,
      state_reason: null,
    },
    comment: {
      url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/comments/1234532076`,
      html_url: `https://github.com/${params.org}/${params.repo}/pull/4#issuecomment-1234532076`,
      issue_url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/4`,
      id: 1234532076,
      node_id: "IC_kwDOHQICPM5JlXbs",
      user: getUserPayload({ id: 588262, login: params.login }),
      created_at: "2022-09-01T16:46:51Z",
      updated_at: "2022-09-01T16:46:51Z",
      author_association: "CONTRIBUTOR",
      body: params.body,
      reactions: {
        url: `https://api.github.com/repos/${params.org}/${params.repo}/issues/comments/1234532076/reactions`,
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
    },
    repository: getRepoPayload({ name: params.repo, owner: params.org }),
    organization: getOrgPayload({ name: params.org }),
    sender: getUserPayload({ id: 588262, login: params.login }),
    installation,
  };
}
