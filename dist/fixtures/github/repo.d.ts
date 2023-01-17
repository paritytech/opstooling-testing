import { RestEndpointMethodTypes } from "@octokit/rest";
export type Repository = RestEndpointMethodTypes["repos"]["get"]["response"]["data"];
export declare function getRepoPayload(params: {
    name: string;
    owner: string;
    node_id?: string;
}): Repository;
