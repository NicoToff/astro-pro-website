import type { components, operations } from "./spells-api";

export type Spell = components["schemas"]["Spell"];
export type SpellFilter = operations["SpellsController_findAll"]["parameters"]["query"];
export type CreateSpell = components["schemas"]["CreateSpellDto"];
