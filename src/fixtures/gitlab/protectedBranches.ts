import { JSONValue } from "@eng-automation/js";

export function getProtectedBranchesPayload(): JSONValue {
  return [
    {
      id: 1,
      name: "master",
      push_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
      merge_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
      allow_force_push: false,
      code_owner_approval_required: false,
    },
  ];
}
