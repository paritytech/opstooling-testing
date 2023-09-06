import { RestEndpointMethodTypes } from "@octokit/rest";
import { basename } from "path";

export type Content = RestEndpointMethodTypes["repos"]["getContent"]["response"]["data"];

export function getRepoContents(params: {
  type: "dir" | "file" | "submodule" | "symlink";
  content: string;
  path: string;
  owner: string;
  repo: string;
}): Content {
  if (params.type !== "file") {
    throw new Error("Not implemented");
  }

  const buf = Buffer.from(params.content);
  return {
    type: "file",
    encoding: "base64",
    size: buf.length,
    name: basename(params.path),
    path: params.path,
    content: buf.toString("base64"),
    sha: "11321a2cee390d77bfca5c3e95a6f03e7d6fe85f",
    url: `https://github.com/${params.owner}/${params.repo}/blob/master/${params.path}`,
    git_url: `https://github.com/${params.owner}/${params.repo}/blob/11321a2cee390d77bfca5c3e95a6f03e7d6fe85f`,
    html_url: `https://github.com/${params.owner}/${params.repo}/blob/master/${params.path}`,
    download_url: `https://raw.githubusercontent.com/${params.owner}/${params.repo}/master/README.md?token=XXXXXXXXXXXXXXXX`,
    _links: {
      self: `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}?ref=master`,
      html: `https://github.com/${params.owner}/${params.repo}/blob/master/${params.path}`,
      git: `https://github.com/${params.owner}/${params.repo}/blob/11321a2cee390d77bfca5c3e95a6f03e7d6fe85f`,
    },
  };
}
