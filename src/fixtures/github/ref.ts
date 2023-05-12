import { DeleteEvent } from "@octokit/webhooks-types";

import { getOrgPayload } from "./org";
import { getRepoPayload } from "./repo";
import { getUserPayload } from "./user";

export function getRefDeletePayload(params: {
  owner: string;
  repo: string;
  login: string;
  ref: string;
  refType: "branch" | "tag";
  node_id?: string;
  installation?: {
    id: number;
    node_id: string;
  };
}): DeleteEvent {
  const installation = params.installation ?? {
    id: 25299948,
    node_id: "MDIzOkludGVncmF0aW9uSW5zdGFsbGF0aW9uMjUyOTk5NDg=",
  };

  return {
    ref: params.ref,
    ref_type: params.refType,
    pusher_type: "user",
    repository: getRepoPayload({ owner: params.owner, name: params.repo, node_id: params.node_id }),
    organization: getOrgPayload({ name: params.owner }),
    sender: getUserPayload({ login: params.login }),
    installation,
  };
}
