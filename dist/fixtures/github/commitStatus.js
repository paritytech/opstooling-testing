"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommitStatusResponsePayload = void 0;
const user_1 = require("./user");
function createCommitStatusResponsePayload(params) {
    return {
        url: `https://api.github.com/repos/${params.owner}/${params.repo}/statuses/${params.sha}`,
        avatar_url: "https://github.com/images/error/hubot_happy.gif",
        id: 1,
        node_id: "MDY6U3RhdHVzMQ==",
        state: params.state ?? "success",
        description: "Build has completed successfully",
        target_url: "https://ci.example.com/1000/output",
        context: params.context ?? "continuous-integration/jenkins",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator: (0, user_1.getUserPayload)({ id: 1, login: params.creator ?? "octocat" }),
    };
}
exports.createCommitStatusResponsePayload = createCommitStatusResponsePayload;
//# sourceMappingURL=commitStatus.js.map