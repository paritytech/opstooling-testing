import { RestEndpointMethodTypes } from "@octokit/rest";

import { getUserPayload } from "./user";

export type CommitStatus = RestEndpointMethodTypes["repos"]["createCommitStatus"]["response"]["data"];

export function createCommitStatusResponsePayload(params: {
  owner: string;
  repo: string;
  sha: string;
  context?: string;
  state?: string;
  creator?: string;
}): CommitStatus {
  return {
    url: `https://api.github.com/repos/${params.owner}/${params.repo}/statuses/${params.sha}`,
    avatar_url: "https://github.com/images/error/hubot_happy.gif",
    id: 1,
    node_id: "MDY6U3RhdHVzMQ==",
    state: params.state ?? "success",
    description: "Build has completed successfully",
    target_url: "https://ci.example.com/1000/output",
    context: params.context ?? "continuous-integration/jenkins",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator: getUserPayload({ id: 1, login: params.creator ?? "octocat" }),
  };
}
