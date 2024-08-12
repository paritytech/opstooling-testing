import { RestEndpointMethodTypes } from "@octokit/rest";
import { Organization } from "@octokit/webhooks-types";

export type OrgMembership = RestEndpointMethodTypes["orgs"]["getMembershipForUser"]["response"]["data"];

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

export function getOrgMembershipPayload(params: {
  login?: string;
  org?: string;
  role?: OrgMembership["role"];
}): OrgMembership {
  const login = params.login ?? "test";
  const org = params.org ?? "test";
  const role: OrgMembership["role"] = params.role ?? "admin";
  return {
    url: `https://api.github.com/orgs/${org}/memberships/${login}`,
    state: "active",
    role,
    organization_url: "https://api.github.com/orgs/octocat",
    organization: {
      login: "github",
      id: 1,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjE=",
      url: "https://api.github.com/orgs/${org}",
      repos_url: `https://api.github.com/orgs/${org}/repos`,
      events_url: `https://api.github.com/orgs/${org}/events`,
      hooks_url: `https://api.github.com/orgs/${org}/hooks`,
      issues_url: `https://api.github.com/orgs/${org}/issues`,
      members_url: `https://api.github.com/orgs/${org}/members{/member}`,
      public_members_url: `https://api.github.com/orgs/${org}/public_members{/member}`,
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      description: "A great organization",
    },
    user: {
      login,
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      gravatar_id: "",
      url: "https://api.github.com/users/${login}",
      html_url: "https://github.com/octocat",
      followers_url: "https://api.github.com/users/${login}/followers",
      following_url: "https://api.github.com/users/${login}/following{/other_user}",
      gists_url: "https://api.github.com/users/${login}/gists{/gist_id}",
      starred_url: "https://api.github.com/users/${login}/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/${login}/subscriptions",
      organizations_url: "https://api.github.com/users/${login}/orgs",
      repos_url: "https://api.github.com/users/${login}/repos",
      events_url: "https://api.github.com/users/${login}/events{/privacy}",
      received_events_url: `https://api.github.com/users/${login}/received_events`,
      type: "User",
      site_admin: false,
    },
  };
}
