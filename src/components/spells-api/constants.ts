export const ActionEnum = {
  INIT: "init",
  UPDATE: "updateField",
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
  sources: [] as string[],
  components: [] as string[],
  damageTypes: [] as string[],
} as const;

export const arrayFields = Object.entries(structuredClone(initialSearchState)).reduce((acc, [k, v]) => {
  if (Array.isArray(v)) {
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
