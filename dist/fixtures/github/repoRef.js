"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoRefsPayload = exports.getRepoRefPayload = void 0;
function getRepoRefPayload(params) {
    return {
        node_id: "REF_kwDOG7BDBrRyZWZzL2hl" + params.name,
        object: {
            sha: params.commit,
            type: "commit",
            url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
        },
        ref: `refs/heads/${params.name}`,
        url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/refs/heads/${params.name}`,
    };
}
exports.getRepoRefPayload = getRepoRefPayload;
function getRepoRefsPayload(params) {
    return params.map(getRepoRefPayload);
}
exports.getRepoRefsPayload = getRepoRefsPayload;
//# sourceMappingURL=repoRef.js.map