"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPushEventPayload = void 0;
const commit_1 = require("./commit");
const org_1 = require("./org");
const repo_1 = require("./repo");
const user_1 = require("./user");
function getPushEventPayload(params) {
    const installation = params.installation ?? {
        id: 25299948,
        node_id: "MDIzOkludGVncmF0aW9uSW5zdGFsbGF0aW9uMjUyOTk5NDg=",
    };
    return {
        ref: params.ref,
        before: params.before ?? "0000000000000000000000000000000000000000",
        after: params.sha,
        repository: (0, repo_1.getRepoPayload)({ name: params.repo, owner: params.owner, node_id: params.node_id }),
        pusher: (0, user_1.getGitUserPayload)({ email: `${params.login}@example.com`, login: params.login }),
        organization: (0, org_1.getOrgPayload)({ name: params.owner }),
        sender: (0, user_1.getUserPayload)({ login: params.login }),
        installation,
        created: false,
        deleted: false,
        forced: false,
        base_ref: null,
        compare: "https://github.com/cornitests/oneone/compare/3e827245041b...084df285d629",
        commits: [(0, commit_1.getPushedCommitPayload)({ sha: params.sha, owner: params.owner, login: params.login, repo: params.repo })],
        head_commit: (0, commit_1.getPushedCommitPayload)({
            sha: params.sha,
            owner: params.owner,
            login: params.login,
            repo: params.repo,
        }),
    };
}
exports.getPushEventPayload = getPushEventPayload;
//# sourceMappingURL=pushEvent.js.map