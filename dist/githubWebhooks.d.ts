import { WebhookEvent } from "@octokit/webhooks-types";
export type TriggerWebhookParams = {
    payload: WebhookEvent;
    githubEventHeader: string;
    port: number;
    eventId?: string;
};
export declare function triggerWebhook(params: TriggerWebhookParams): Promise<void>;
