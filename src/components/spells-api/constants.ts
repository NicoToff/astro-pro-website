import { COMPONENTS, SCHOOLS, SOURCES, SPELL_LEVELS, DAMAGE_TYPES } from "dnd-home-utils";
import type { ComponentName, SchoolName, SourceName, SpellLevel, DamageType } from "dnd-home-utils";
import type { ToString } from "@/types/helpers";

export const ActionEnum = {
  INIT: "init",
  UPDATE_STRING_FIELD: "updateField",
  UPDATE_OBJECT_FIELD: "updateObjectField",
  CLEAR_STRING_FIELD: "removeField",
  CLEAR_OBJECT_FIELD: "removeObjectField",
  FULL_RESET: "fullReset",
} as const;

export const initialSearchState = {
  name: "" as string,
  level: Object.fromEntries(SPELL_LEVELS.map((l) => [String(l), false])) as Record<ToString<SpellLevel>, boolean>,
  ritual: "" as string,
  concentration: "" as string,
  school: Object.fromEntries(SCHOOLS.map((s) => [s, false])) as Record<SchoolName, boolean>,
  group: "" as string,
  sources: Object.fromEntries(SOURCES.map((s) => [s, false])) as Record<SourceName, boolean>,
  components: Object.fromEntries(COMPONENTS.map((c) => [c, false])) as Record<ComponentName, boolean>,
  damageTypes: Object.fromEntries(DAMAGE_TYPES.map((d) => [d, false])) as Record<DamageType, boolean>,
} as const;

export const { stringFieldsKey, objectFieldsKey } = Object.entries(initialSearchState).reduce(
  (acc, [k, v]) => {
    if (typeof v === "object" && !Array.isArray(v)) {
      acc.objectFieldsKey.push(k);
    } else if (typeof v === "string") {
      acc.stringFieldsKey.push(k);
    } else {
      throw new Error(`Unhandled field ${k} with value ${v} that is typeof ${typeof v}`);
    }
    return acc;
  },
  {
    stringFieldsKey: [] as string[],
    objectFieldsKey: [] as string[],
  }
);

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
