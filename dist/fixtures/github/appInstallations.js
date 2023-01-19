"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppInstallationsPayload = void 0;
const user_1 = require("./user");
function getAppInstallationsPayload(installations) {
    return installations.map((installation) => getAppInstallationPayload(installation));
}
exports.getAppInstallationsPayload = getAppInstallationsPayload;
function getAppInstallationPayload(params) {
    return {
        id: params.id,
        account: (0, user_1.getUserPayload)({ login: params.accountLogin, id: params.accountId }),
        access_tokens_url: `https://api.github.com/installations/${params.id}/access_tokens`,
        repositories_url: "https://api.github.com/installation/repositories",
        html_url: `https://github.com/organizations/github/settings/installations/${params.id}`,
        app_id: 1,
        target_id: 1,
        target_type: "Organization",
        permissions: { checks: "write", metadata: "read", contents: "read" },
        events: ["push", "pull_request"],
        single_file_name: "config.yaml",
        has_multiple_single_files: true,
        single_file_paths: ["config.yml", ".github/issue_TEMPLATE.md"],
        repository_selection: "selected",
        created_at: "2017-07-08T16:18:44-04:00",
        updated_at: "2017-07-08T16:18:44-04:00",
        app_slug: "github-actions",
        suspended_at: null,
        suspended_by: null,
    };
}
//# sourceMappingURL=appInstallations.js.map