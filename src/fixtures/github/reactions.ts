import { RestEndpointMethodTypes } from "@octokit/rest";

export type IssueCommentReaction = RestEndpointMethodTypes["reactions"]["createForIssueComment"]["response"]["data"];

export function getIssueCommentReactionsPayload(params: {
  reactions: { author: string; body: string; id: number }[];
}): IssueCommentReaction[] {
  return params.reactions.map((reaction) => getIssueCommentReactionPayload(reaction));
}

export function getIssueCommentReactionPayload(params: {
  user?: string;
  id?: number;
  content?: IssueCommentReaction["content"];
}): IssueCommentReaction {
  const user = params.user ?? "octocat";
  return {
    id: params.id ?? 1,
    node_id: "MDg6UmVhY3Rpb24x",
    user: {
      login: user,
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      gravatar_id: "",
      url: `https://api.github.com/users/${user}`,
      html_url: `https://github.com/${user}`,
      followers_url: `https://api.github.com/users/${user}/followers`,
      following_url: `https://api.github.com/users/${user}/following{/other_user}`,
      gists_url: `https://api.github.com/users/${user}/gists{/gist_id}`,
      starred_url: `https://api.github.com/users/${user}/starred{/owner}{/repo}`,
      subscriptions_url: `https://api.github.com/users/${user}/subscriptions`,
      organizations_url: `https://api.github.com/users/${user}/orgs`,
      repos_url: `https://api.github.com/users/${user}/repos`,
      events_url: `https://api.github.com/users/${user}/events{/privacy}`,
      received_events_url: `https://api.github.com/users/${user}/received_events`,
      type: "User",
      site_admin: false,
    },
    content: params.content ?? "heart",
    created_at: "2016-05-20T20:09:31Z",
  };
}
