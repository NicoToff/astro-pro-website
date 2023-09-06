import { useEffect, useState, useReducer, useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { searchReducer } from "./reducer";
import { ActionEnum, arrayFields, initialSearchState } from "./constants";
import type { SearchState, SearchStateArrayField, SearchStateKey, SearchStateStringField } from "./types";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { filterIsEmpty, stringifyArrayFields, updateBrowserHistory } from "./helpers";
import type { Writeable } from "@/types/helpers";
import { useOnMount } from "../hooks/use-on-mount";

export type UseFiltersArgs<T> = {
  url: string;
  setResult: Dispatch<SetStateAction<T[]>>;
};
export function useFilters<T>({ url, setResult }: UseFiltersArgs<T>) {
  const isFirstRender = useRef(true);
  const [filter, dispatchFilter] = useReducer(searchReducer, { ...initialSearchState });
  const [isFetching, setIsFetching] = useState(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setIsFetching(true);
    const { name, value } = e.target;
    dispatchFilter({ type: ActionEnum.UPDATE, fieldName: name as SearchStateKey, value });
  }

  function onCheckedChange(e: CheckedState, fieldName: SearchStateKey) {
    setIsFetching(true);
    const value = e.valueOf().toString();
    if (value === "true") {
      dispatchFilter({
        type: ActionEnum.UPDATE,
        fieldName,
        value,
      });
    } else {
      dispatchFilter({
        type: ActionEnum.REMOVE,
        fieldName,
      });
    }
  }

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>, fieldName: SearchStateKey) {
    setIsFetching(true);
    dispatchFilter({ type: ActionEnum.UPDATE, fieldName, value: e.target.value });
  }

  function clearField(fieldName: SearchStateKey) {
    setIsFetching(true);
    dispatchFilter({ type: ActionEnum.REMOVE, fieldName });
  }

  useOnMount(() => {
    const params = new URLSearchParams(window.location.search);
    const initValue = { ...initialSearchState } as Writeable<SearchState>;
    for (const key of Object.keys(initValue)) {
      const value = params.get(key);
      if (value) {
        if (arrayFields.includes(key as SearchStateArrayField)) {
          initValue[key as SearchStateArrayField] = value.split(",");
          continue;
        }
        initValue[key as SearchStateStringField] = value;
      }
    }
    if (!filterIsEmpty(initValue)) {
      dispatchFilter({ type: ActionEnum.INIT, initValue });
      setIsFetching(true);
    }
  });

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }

    if (filterIsEmpty(filter)) {
      setResult([]);
      setIsFetching(false);
      updateBrowserHistory("");
      return;
    }

    const timeoutId = setTimeout(() => {
      const leanFilter = Object.entries(stringifyArrayFields(filter)).filter(([, v]) => v !== "");
      const params = new URLSearchParams(leanFilter).toString();
      updateBrowserHistory(params);

      fetch(`${url}?${params}`)
        .then((res) => res.json() as Promise<T[]>)
        .then((spells) => setResult(spells))
        .catch((err) => {
          console.error(err);
          setResult([]);
        })
        .finally(() => setIsFetching(false));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filter]);

  return {
    filter,
    onChange,
    onCheckedChange,
    onSelectChange,
    isFetching,
    clearField,
    clearFilters: () => dispatchFilter({ type: ActionEnum.FULL_RESET }),
  };
}
