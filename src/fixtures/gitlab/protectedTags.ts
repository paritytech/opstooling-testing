import { JSONValue } from "opstooling-js";

export function getProtectedTagsPayload(): JSONValue {
  return [
    {
      name: "testtag*",
      create_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
      merge_access_levels: [{ id: 1, access_level: 40, access_level_description: "Maintainers" }],
    },
  ];
}
