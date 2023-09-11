import { initialSearchState, arrayFields } from "./constants";
import type { ArrayFields } from "@/types/helpers";

export type SearchState = typeof initialSearchState;
export type SearchStateKey = keyof SearchState;
export type SearchStateArrayField = ArrayFields<SearchState>;
export type SearchStateStringField = Exclude<SearchStateKey, SearchStateArrayField>;

export function isSearchStateKey(obj: unknown): obj is SearchStateKey {
  return Object.keys(structuredClone(initialSearchState)).includes(obj as SearchStateKey);
}
export function isSearchStateArrayField(obj: unknown): obj is SearchStateArrayField {
  return arrayFields.includes(obj as SearchStateArrayField);
}
export function isSearchStateStringField(obj: unknown): obj is SearchStateStringField {
  return isSearchStateKey(obj) && !arrayFields.includes(obj as SearchStateStringField);
}
