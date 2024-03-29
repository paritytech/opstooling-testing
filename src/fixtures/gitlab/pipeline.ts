import { JSONValue } from "@eng-automation/js";

export function getPipelinePayload(params: { status: string }): JSONValue {
  return {
    id: 61,
    iid: 21,
    project_id: 1,
    sha: "384c444e840a515b23f21915ee5766b87068a70d",
    ref: "main",
    status: params.status,
    before_sha: "0000000000000000000000000000000000000000",
    tag: false,
    yaml_errors: null,
    user: {
      name: "Administrator",
      username: "root",
      id: 1,
      state: "active",
      avatar_url: "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon",
      web_url: "http://localhost:3000/root",
    },
    created_at: "2016-11-04T09:36:13.747Z",
    updated_at: "2016-11-04T09:36:13.977Z",
    started_at: null,
    finished_at: null,
    committed_at: null,
    duration: null,
    queued_duration: 0.01,
    coverage: null,
    web_url: "https://example.com/foo/bar/pipelines/61",
  };
}
