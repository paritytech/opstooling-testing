import { RestEndpointMethodTypes } from "@octokit/rest";
import { Repository as WebhooksRepository } from "@octokit/webhooks-types";
export type Repository = RestEndpointMethodTypes["repos"]["get"]["response"]["data"] & WebhooksRepository;
export declare function getRepoPayload(params: {
    name: string;
    owner: string;
    node_id?: string;
}): Repository;
