import { RestEndpointMethodTypes } from "@octokit/rest";
export type AppInstallationToken = RestEndpointMethodTypes["apps"]["createInstallationAccessToken"]["response"]["data"];
export declare function getAppInstallationTokenPayload(): AppInstallationToken;
