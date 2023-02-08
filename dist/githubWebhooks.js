"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerWebhook = void 0;
const crypto_1 = require("crypto");
const node_fetch_1 = __importDefault(require("node-fetch"));
async function triggerWebhook(params) {
    const normalisedBody = toNormalizedJsonString(params.payload);
    const signature1 = (0, crypto_1.createHmac)("sha1", "webhook_secret_value").update(normalisedBody).digest("hex");
    const signature256 = (0, crypto_1.createHmac)("sha256", "webhook_secret_value").update(normalisedBody).digest("hex");
    await (0, node_fetch_1.default)(`http://localhost:${params.port}`, {
        method: "POST",
        body: normalisedBody,
        headers: {
            "X-Hub-Signature": `sha1=${signature1}`,
            "X-Hub-Signature-256": `sha256=${signature256}`,
            "X-GitHub-Event": params.githubEventHeader,
            "X-GitHub-Delivery": params.eventId ?? "72d3162e-cc78-11e3-81ab-4c9367dc0958",
        },
    });
}
exports.triggerWebhook = triggerWebhook;
// @see https://github.com/octokit/webhooks.js/blob/37fac3996a8aca3769ce8f435fd05074d06c6536/src/to-normalized-json-string.ts
function toNormalizedJsonString(payload) {
    const payloadString = JSON.stringify(payload);
    return payloadString.replace(/[^\\]\\u[\da-f]{4}/g, (s) => s.substring(0, 3) + s.substring(3).toUpperCase());
}
//# sourceMappingURL=githubWebhooks.js.map