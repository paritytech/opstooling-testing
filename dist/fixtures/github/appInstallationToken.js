"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppInstallationTokenPayload = void 0;
// FIXME: correct type for the payload
function getAppInstallationTokenPayload() {
    return {
        // This is an example token from docs.github.com
        token: "ghs_16C7e42F292c6912E7710c838347Ae178B4a",
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        permissions: { issues: "write", contents: "read" },
    };
}
exports.getAppInstallationTokenPayload = getAppInstallationTokenPayload;
//# sourceMappingURL=appInstallationToken.js.map