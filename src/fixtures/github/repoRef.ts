export type RepoRef = {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
};

export function getRepoRefPayload(params: { name: string; commit: string; owner: string; repo: string }): RepoRef {
  return {
    node_id: "REF_kwDOG7BDBrRyZWZzL2hl" + params.name,
    object: {
      sha: params.commit,
      type: "commit",
      url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
    },
    ref: `refs/heads/${params.name}`,
    url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/refs/heads/${params.name}`,
  };
}

export function getRepoRefsPayload(params: { name: string; commit: string; owner: string; repo: string }[]): RepoRef[] {
  return params.map(getRepoRefPayload);
}
