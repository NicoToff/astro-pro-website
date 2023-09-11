import { useEffect, useState, useReducer, useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { searchReducer } from "./reducer";
import { ActionEnum, initialSearchState } from "./constants";
import { useOnMount } from "../hooks/use-on-mount";
import { filterIsEmpty, getURLSearchParams, parseQueryString, purgeEmptyFields, updateBrowserHistory } from "./helpers";
import type { SearchStateKey } from "./types";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type UseFiltersArgs<T> = {
  url: string;
  setResult: Dispatch<SetStateAction<T[]>>;
};
export function useFilters<T>({ url, setResult }: UseFiltersArgs<T>) {
  const isFirstRender = useRef(true);
  const [filter, dispatchFilter] = useReducer(searchReducer, structuredClone(initialSearchState));
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

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
    const initValue = parseQueryString(window.location.search);
    if (!filterIsEmpty(initValue)) {
      dispatchFilter({ type: ActionEnum.INIT, initValue });
      setIsFetching(true);
    }
  });

  useEffect(() => {
    setIsError(false);
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
      const leanFilter = purgeEmptyFields(filter);
      const params = getURLSearchParams(leanFilter);
      updateBrowserHistory(params.toString());

      fetch(`${url}?${params}`)
        .then((res) => res.json() as Promise<T[]>)
        .then((spells) => setResult(spells))
        .catch((err) => {
          console.error(err);
          setIsError(true);
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
    isError,
    clearField,
    clearFilters: () => dispatchFilter({ type: ActionEnum.FULL_RESET }),
  };
}
