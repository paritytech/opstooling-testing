import { RestEndpointMethodTypes } from "@octokit/rest";
import { Committer, User as WebhooksUser } from "@octokit/webhooks-types";

// These types from "@octokit/rest" and "@octokit/webhooks-types" are the same, but with minor TS semantics.
// Defining it as an intersection solves those.
export type User = RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"] & WebhooksUser;

export function getUserPayload(params: { bio?: string; id?: number; login: string }): User {
  const id = params.id ?? 588262;
  return {
    login: params.login,
    id,
    node_id: "MDQ6VXNlcjU4ODI2Mg==",
    avatar_url: `https://avatars.githubusercontent.com/u/${id}?v=4`,
    gravatar_id: "",
    url: `https://api.github.com/users/${params.login}`,
    html_url: `https://github.com/${params.login}`,
    followers_url: `https://api.github.com/users/${params.login}/followers`,
    following_url: `https://api.github.com/users/${params.login}/following{/other_user}`,
    gists_url: `https://api.github.com/users/${params.login}/gists{/gist_id}`,
    starred_url: `https://api.github.com/users/${params.login}/starred{/owner}{/repo}`,
    subscriptions_url: `https://api.github.com/users/${params.login}/subscriptions`,
    organizations_url: `https://api.github.com/users/${params.login}/orgs`,
    repos_url: `https://api.github.com/users/${params.login}/repos`,
    events_url: `https://api.github.com/users/${params.login}/events{/privacy}`,
    received_events_url: `https://api.github.com/users/${params.login}/received_events`,
    type: "User",
    site_admin: false,
    name: params.login,
    company: "Example Technologies",
    email: `${params.login}@example.com`,
    blog: "https://github.com/blog",
    hireable: false,
    bio: params.bio ?? "There once was...",
    public_repos: 2,
    public_gists: 1,
    location: "San Francisco",
    followers: 20,
    following: 0,
    created_at: "2008-01-14T04:33:35Z",
    updated_at: "2008-01-14T04:33:35Z",
  };
}

export type GitUser =
  RestEndpointMethodTypes["repos"]["getBranch"]["response"]["data"]["commit"]["commit"]["committer"] & Committer;

// Date is optional in Committer, however, it can be mandatory in usages of Committer
export function getGitUserPayload(params: { login: string; email: string }): GitUser {
  return { email: params.email, name: params.login };
}
