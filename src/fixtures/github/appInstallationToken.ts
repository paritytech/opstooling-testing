import { RestEndpointMethodTypes } from "@octokit/rest";

export type AppInstallationToken = RestEndpointMethodTypes["apps"]["createInstallationAccessToken"]["response"]["data"];

// FIXME: correct type for the payload
export function getAppInstallationTokenPayload(): AppInstallationToken {
  return {
    // This is an example token from docs.github.com
    token: "ghs_16C7e42F292c6912E7710c838347Ae178B4a",
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    permissions: { issues: "write", contents: "read" },
  };
}
