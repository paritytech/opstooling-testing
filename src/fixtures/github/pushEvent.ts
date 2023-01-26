import { PushEvent } from "@octokit/webhooks-types";

import { getPushedCommitPayload } from "./commit";
import { getOrgPayload } from "./org";
import { getRepoPayload } from "./repo";
import { getGitUserPayload, getUserPayload } from "./user";

export type PushEventParams = {
  sha: string;
  /** @example "refs/heads/master", "refs/tags/v1.0.0" */
  ref: string;
  /** previous ref for branches */
  before?: string;
  owner: string;
  repo: string;
  node_id?: string;
  login: string;
  installation?: {
    id: number;
    node_id: string;
  };
};

export function getPushEventPayload(params: PushEventParams): PushEvent {
  const installation = params.installation ?? {
    id: 25299948,
    node_id: "MDIzOkludGVncmF0aW9uSW5zdGFsbGF0aW9uMjUyOTk5NDg=",
  };

  return {
    ref: params.ref,
    before: params.before ?? "0000000000000000000000000000000000000000",
    after: params.sha,
    repository: getRepoPayload({ name: params.repo, owner: params.owner, node_id: params.node_id }),
    pusher: getGitUserPayload({ email: `${params.login}@example.com`, login: params.login }),
    organization: getOrgPayload({ name: params.owner }),
    sender: getUserPayload({ login: params.login }),
    installation,
    created: false,
    deleted: false,
    forced: false,
    base_ref: null,
    compare: "https://github.com/cornitests/oneone/compare/3e827245041b...084df285d629",
    commits: [getPushedCommitPayload({ sha: params.sha, owner: params.owner, login: params.login, repo: params.repo })],
    head_commit: getPushedCommitPayload({
      sha: params.sha,
      owner: params.owner,
      login: params.login,
      repo: params.repo,
    }),
  };
}
