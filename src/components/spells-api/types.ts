import { initialSearchState, arrayFields, objectFields } from "./constants";
import type { StringFields, ArrayFields, ObjectFields } from "@/types/helpers";

export type SearchState = typeof initialSearchState;
export type SearchStateKey = keyof SearchState;
export type SearchStateStringField = StringFields<SearchState>;
export type SearchStateArrayField = ArrayFields<SearchState>;
export type SearchStateObjectField = ObjectFields<SearchState>;
export type SearchStateObjectFieldKey<T extends SearchStateObjectField> = keyof SearchState[T];

export function isSearchStateKey(obj: unknown): obj is SearchStateKey {
  return Object.keys(initialSearchState).includes(obj as SearchStateKey);
}
export function isSearchStateArrayField(obj: unknown): obj is SearchStateArrayField {
  return arrayFields.includes(obj as SearchStateArrayField);
}
export function isSearchStateObjectField(obj: unknown): obj is SearchStateObjectField {
  return objectFields.includes(obj as SearchStateObjectField);
}
export function isSearchStateStringField(obj: unknown): obj is SearchStateStringField {
  return isSearchStateKey(obj) && !arrayFields.includes(obj as SearchStateStringField);
}
export function isSearchStateObjectSubfieldKey<T extends SearchStateObjectField>(
  obj: unknown,
  fieldName: T
): obj is SearchStateObjectFieldKey<T> {
  return typeof obj === "string" && Object.keys(initialSearchState[fieldName]).includes(obj);
}
