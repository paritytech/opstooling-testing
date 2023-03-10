import { Organization } from "@octokit/webhooks-types";

export function getOrgPayload(params: { name: string; id?: number; node_id?: string }): Organization {
  const id = params.id ?? 104585557;
  return {
    login: params.name,
    id,
    node_id: params.node_id ?? "O_kgDOBjvZVQ",
    url: `https://api.github.com/orgs/${params.name}`,
    repos_url: `https://api.github.com/orgs/${params.name}/repos`,
    events_url: `https://api.github.com/orgs/${params.name}/events`,
    hooks_url: `https://api.github.com/orgs/${params.name}/hooks`,
    issues_url: `https://api.github.com/orgs/${params.name}/issues`,
    members_url: `https://api.github.com/orgs/${params.name}/members{/member}`,
    public_members_url: `https://api.github.com/orgs/${params.name}/public_members{/member}`,
    avatar_url: `https://avatars.githubusercontent.com/u/${String(id)}?v=4`,
    description: null,
  };
}
