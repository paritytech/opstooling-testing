import { RestEndpointMethodTypes } from "@octokit/rest";
export type Installation = RestEndpointMethodTypes["apps"]["getInstallation"]["response"]["data"];
export declare function getAppInstallationsPayload(installations: {
    id: number;
    accountLogin: string;
    accountId: number;
}[]): Installation[];
