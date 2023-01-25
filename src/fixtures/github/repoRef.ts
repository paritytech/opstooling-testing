import { RestEndpointMethodTypes } from "@octokit/rest";

export type RepoRef = RestEndpointMethodTypes["git"]["getRef"]["response"]["data"];

export type RepoRefParams = {
  /** @example "refs/heads/master", "refs/tags/v1.0.0" */
  ref: string;
  commit: string;
  owner: string;
  repo: string;
  node_id?: string;
};

export function getRepoRefPayload(params: RepoRefParams): RepoRef {
  const node_id = params.node_id ?? "REF_kwDOG7BDBrRyZWZzL2hl" + params.ref.replace("/", "");

  return {
    node_id,
    object: {
      sha: params.commit,
      type: "commit",
      url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
    },
    ref: params.ref,
    url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/${params.ref}`,
  };
}

export function getRepoRefsPayload(params: RepoRefParams[]): RepoRef[] {
  return params.map(getRepoRefPayload);
}
