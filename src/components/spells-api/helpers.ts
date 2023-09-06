import type { SearchState } from "./types";

export function updateBrowserHistory(params: string) {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `?${params}`); // Note: no need to manually encodeURI
  }
}

export function filterIsEmpty(filter: SearchState) {
  return Object.values(filter).every((v) => {
    if (Array.isArray(v)) {
      return v.length === 0;
    }
    return v === "";
  });
}

export function stringifyArrayFields(filter: SearchState) {
  return Object.fromEntries(
    Object.entries(filter).map(([k, v]) => {
      if (Array.isArray(v)) {
        return [k, v.join(",")];
      }
      return [k, v];
    })
  );
}
