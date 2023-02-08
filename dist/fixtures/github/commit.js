"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPushedCommitPayload = void 0;
const user_1 = require("./user");
function getPushedCommitPayload(params) {
    const email = params.email ?? `${params.login}@example.com`;
    return {
        id: params.sha,
        tree_id: "f9dd80c6bb4248cecf971e78454fe41c8f0f1fb5",
        distinct: true,
        message: "test",
        timestamp: "2022-07-25T15:34:32+02:00",
        url: `https://github.com/${params.owner}/${params.repo}/commit/${params.sha}`,
        author: (0, user_1.getGitUserPayload)({ login: params.login, email }),
        committer: (0, user_1.getGitUserPayload)({ login: params.login, email }),
        added: [],
        removed: [],
        modified: ["README.md"],
    };
}
exports.getPushedCommitPayload = getPushedCommitPayload;
//# sourceMappingURL=commit.js.map