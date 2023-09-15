import { initialSearchState, stringFieldsKey, objectFieldsKey } from "./constants";
import type { StringFieldsKeysInObject, ObjectFieldsKeysInObject } from "@/types/helpers";

export type SearchState = typeof initialSearchState;
export type SearchStateKey = keyof SearchState;
export type SearchStateStringFieldKey = StringFieldsKeysInObject<SearchState>;
export type SearchStateObjectFieldKey = ObjectFieldsKeysInObject<SearchState>;
export type SearchStateObjectFieldSubfieldKey<T extends SearchStateObjectFieldKey> = keyof SearchState[T];

export function isSearchStateKey(obj: unknown): obj is SearchStateKey {
  return isString(obj) && Object.keys(initialSearchState).includes(obj);
}
export function isSearchStateObjectField(obj: unknown): obj is SearchStateObjectFieldKey {
  return isString(obj) && objectFieldsKey.includes(obj);
}
export function isSearchStateStringField(obj: unknown): obj is SearchStateStringFieldKey {
  return isString(obj) && stringFieldsKey.includes(obj);
}
export function isSearchStateObjectSubfieldKey<T extends SearchStateObjectFieldKey>(
  obj: unknown,
  fieldName: T
): obj is SearchStateObjectFieldSubfieldKey<T> {
  return isString(obj) && Object.keys(initialSearchState[fieldName]).includes(obj);
}

function isString(val: unknown): val is string {
  return typeof val === "string";
}
