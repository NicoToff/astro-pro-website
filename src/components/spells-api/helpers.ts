import type { Writeable } from "astro/zod";
import { initialSearchState } from "./constants";
import { isSearchStateArrayField, isSearchStateStringField, type SearchState } from "./types";

export function updateBrowserHistory(params: string) {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `?${params}`); // Note: no need to manually encodeURI
  }
}

export function filterIsEmpty(filter: Partial<SearchState>) {
  return Object.values(filter).every((v) => {
    if (Array.isArray(v)) {
      return v.length === 0;
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
    if (isSearchStateArrayField(key)) {
      if (params[key].includes(value)) continue;
      params[key].push(value);
    } else if (isSearchStateStringField(key)) {
      params[key] = value.replace("+", " ");
    }
  }

  return params;
}

export function purgeEmptyFields<T extends { [key: string]: string | string[] }>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (Array.isArray(v)) {
        return v.length > 0;
      }
      return v !== "";
    })
  ) as Partial<T>;
}

export function getURLSearchParams(filter: Partial<SearchState>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filter)) {
    if (Array.isArray(value)) {
      for (const elem of value) {
        params.append(key, elem);
      }
    } else {
      params.append(key, value);
    }
  }
  return params;
}

// export function stringifyArrayFields(filter: SearchState) {
//   return Object.fromEntries(
//     Object.entries(filter).map(([k, v]) => {
//       if (Array.isArray(v)) {
//         return [k, v.join(",")];
//       }
//       return [k, v];
//     })
//   );
// }
