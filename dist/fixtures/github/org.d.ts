import { Organization } from "@octokit/webhooks-types";
export declare function getOrgPayload(params: {
    name: string;
    id?: number;
    node_id?: string;
}): Organization;
