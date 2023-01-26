import { PushEvent } from "@octokit/webhooks-types";
export type PushEventParams = {
    sha: string;
    /** @example "refs/heads/master", "refs/tags/v1.0.0" */
    ref: string;
    /** previous ref for branches */
    before?: string;
    owner: string;
    repo: string;
    node_id?: string;
    login: string;
    installation?: {
        id: number;
        node_id: string;
    };
};
export declare function getPushEventPayload(params: PushEventParams): PushEvent;
