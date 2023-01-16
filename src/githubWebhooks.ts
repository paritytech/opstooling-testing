import { WebhookEvent } from "@octokit/webhooks-types";
import { createHmac } from "crypto";
import fetch from "node-fetch";

export type TriggerWebhookParams = {
  payload: WebhookEvent;
  githubEventHeader: string;
  port: number;
};

export async function triggerWebhook(params: TriggerWebhookParams): Promise<void> {
  const normalisedBody = toNormalizedJsonString(params.payload);
  const signature1 = createHmac("sha1", "webhook_secret_value").update(normalisedBody).digest("hex");
  const signature256 = createHmac("sha256", "webhook_secret_value").update(normalisedBody).digest("hex");

  await fetch(`http://localhost:${params.port}`, {
    method: "POST",
    body: normalisedBody,
    headers: {
      "X-Hub-Signature": `sha1=${signature1}`,
      "X-Hub-Signature-256": `sha256=${signature256}`,
      "X-GitHub-Event": params.githubEventHeader,
      "X-GitHub-Delivery": "72d3162e-cc78-11e3-81ab-4c9367dc0958",
    },
  });
}

// @see https://github.com/octokit/webhooks.js/blob/37fac3996a8aca3769ce8f435fd05074d06c6536/src/to-normalized-json-string.ts
function toNormalizedJsonString(payload: WebhookEvent): string {
  const payloadString = JSON.stringify(payload);
  return payloadString.replace(/[^\\]\\u[\da-f]{4}/g, (s) => s.substring(0, 3) + s.substring(3).toUpperCase());
}
