import { Commit } from "@octokit/webhooks-types";

import { getGitUserPayload } from "./user";

export function getPushedCommitPayload(params: {
  sha: string;
  owner: string;
  repo: string;
  login: string;
  email?: string;
}): Commit {
  const email = params.email ?? `${params.login}@example.com`;

  return {
    id: params.sha,
    tree_id: "f9dd80c6bb4248cecf971e78454fe41c8f0f1fb5",
    distinct: true,
    message: "test",
    timestamp: "2022-07-25T15:34:32+02:00",
    url: `https://github.com/${params.owner}/${params.repo}/commit/${params.sha}`,
    author: getGitUserPayload({ login: params.login, email }),
    committer: getGitUserPayload({ login: params.login, email }),
    added: [],
    removed: [],
    modified: ["README.md"],
  };
}
