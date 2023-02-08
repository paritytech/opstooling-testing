"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtectedTagsPayload = void 0;
function getProtectedTagsPayload() {
    return [
        {
            name: "testtag*",
            create_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
            merge_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
        },
    ];
}
exports.getProtectedTagsPayload = getProtectedTagsPayload;
//# sourceMappingURL=protectedTags.js.map