import { SOURCES, type SourceName } from "dnd-home-utils";

export const ActionEnum = {
  INIT: "init",
  UPDATE: "updateField",
  UPDATE_OBJECT_FIELD: "updateObjectField",
  REMOVE: "removeField",
  FULL_RESET: "fullReset",
} as const;

export const initialSearchState = {
  name: "" as string,
  level: "" as string,
  ritual: "" as string,
  concentration: "" as string,
  school: "" as string,
  group: "" as string,
  sources: Object.fromEntries(SOURCES.map((s) => [s, false])) as Record<SourceName, boolean>,
  components: [] as string[],
  damageTypes: [] as string[],
} as const;

export const arrayFields = Object.entries(structuredClone(initialSearchState)).reduce((acc, [k, v]) => {
  if (Array.isArray(v)) {
    acc.push(k);
  }
  return acc;
}, [] as string[]);

export const objectFields = Object.entries(structuredClone(initialSearchState)).reduce((acc, [k, v]) => {
  if (typeof v === "object" && !Array.isArray(v)) {
    acc.push(k);
  }
  return acc;
}, [] as string[]);

export const MOBILE_AGENT_TAGS = [
  "iphone",
  "ipad",
  "android",
  "mobile",
  "miuibrowser",
  "tablet",
  "webos",
  "blackberry",
] as const;
