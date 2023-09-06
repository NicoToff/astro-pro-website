export const SCHOOLS = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
] as const;

export const COMPONENTS = ["V", "S", "M"] as const;

export const SOURCES = [
  "Arcane",
  "Divine",
  "Primal",
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

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
} as const;

export const arrayFields = Object.entries(initialSearchState).reduce((acc, [k, v]) => {
  if (Array.isArray(v)) {
    acc.push(k);
  }
  return acc;
}, [] as string[]);