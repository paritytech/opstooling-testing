"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoRefsPayload = exports.getRepoRefPayload = void 0;
function getRepoRefPayload(params) {
    const node_id = params.node_id ?? "REF_kwDOG7BDBrRyZWZzL2hl" + params.ref.replace("/", "");
    return {
        node_id,
        object: {
            sha: params.commit,
            type: "commit",
            url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/commits/${params.commit}`,
        },
        ref: params.ref,
        url: `https://api.github.com/repos/${params.owner}/${params.repo}/git/${params.ref}`,
    };
}
exports.getRepoRefPayload = getRepoRefPayload;
function getRepoRefsPayload(params) {
    return params.map(getRepoRefPayload);
}
exports.getRepoRefsPayload = getRepoRefsPayload;
//# sourceMappingURL=repoRef.js.map