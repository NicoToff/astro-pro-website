import { initialSearchState } from "./constants";
import { isSearchStateObjectField, isSearchStateObjectSubfieldKey, isSearchStateStringField } from "./types";
import type { Writeable } from "astro/zod";
import type { SearchState } from "./types";

export function updateBrowserHistory(params: string) {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `?${params}`); // Note: no need to manually encodeURI
  }
}

export function filterIsEmpty(filter: Partial<SearchState>) {
  return Object.values(filter).every((v) => {
    if (Array.isArray(v)) {
      return v.length === 0;
    } else if (typeof v === "object") {
      return Object.values(v).every((v) => v === false);
    }
    return v === "";
  });
}

export function parseQueryString(queryString: string) {
  const params = structuredClone(initialSearchState) as Writeable<SearchState>;

  const keyValuePairs = queryString.replace("?", "").split("&");

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split("=");
    if (!value) continue;
    else if (isSearchStateObjectField(key) && isSearchStateObjectSubfieldKey(value, key)) {
      // @ts-ignore
      params[key][value] = true;
    } else if (isSearchStateStringField(key)) {
      params[key] = value.replace("+", " ");
    }
  }

  return params;
}

type ValidObjArg = { [key: string]: string | string[] | boolean | ValidObjArg | undefined | null };
export function deepPurgeEmptyFields<T extends ValidObjArg>(
  obj: T,
  valuesToExclude = [null, undefined, false, "", "[]", "{}"]
): Partial<T> {
  const result: Partial<T> = {};
  const valuesToExcludeSet = new Set(valuesToExclude);

  for (const [key, value] of Object.entries(obj)) {
    if (valuesToExcludeSet.has(value as any)) continue;

    if (Array.isArray(value)) {
      const filtered = value.filter(Boolean);
      if (filtered.length > 0) {
        (result as ValidObjArg)[key] = filtered;
      }
      continue;
    }

    if (typeof value === "object") {
      const nestedPurged = deepPurgeEmptyFields(value as ValidObjArg);
      if (Object.keys(nestedPurged).length > 0) {
        (result as ValidObjArg)[key] = nestedPurged;
      }
      continue;
    }

    (result as ValidObjArg)[key] = value;
  }
  return result;
}

export function makeURLSearchParams(filter: Partial<SearchState>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filter)) {
    if (Array.isArray(value)) {
      for (const elem of value) {
        params.append(key, elem);
      }
    } else if (isSearchStateObjectField(key)) {
      const subField = filter[key];
      if (subField == null) continue;
      for (const [subfieldKey, bool] of Object.entries(subField)) {
        if (bool && isSearchStateObjectSubfieldKey(subfieldKey, key)) {
          params.append(key, subfieldKey);
        }
      }
    } else {
      params.append(key, value as string);
    }
  }
  return params;
}
