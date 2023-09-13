import { useEffect, useState, useReducer, useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { searchReducer } from "./reducer";
import { ActionEnum, initialSearchState } from "./constants";
import { useOnMount } from "../hooks/use-on-mount";
import {
  filterIsEmpty,
  makeURLSearchParams,
  parseQueryString,
  deepPurgeEmptyFields,
  updateBrowserHistory,
} from "./helpers";
import {
  isSearchStateObjectField,
  isSearchStateStringField,
  type SearchStateKey,
  type SearchStateObjectField,
  type SearchStateStringField,
} from "./types";
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
    dispatchFilter({ type: ActionEnum.UPDATE_STRING_FIELD, fieldName: name as SearchStateStringField, value });
  }

  function onCheckedChange(e: CheckedState, fieldName: SearchStateStringField) {
    setIsFetching(true);
    const value = e.valueOf().toString();
    if (value === "true") {
      dispatchFilter({
        type: ActionEnum.UPDATE_STRING_FIELD,
        fieldName,
        value,
      });
    } else {
      dispatchFilter({
        type: ActionEnum.CLEAR_STRING_FIELD,
        fieldName,
      });
    }
  }

  function onArrayCheckedChange(e: CheckedState, fieldName: SearchStateObjectField, subFieldName: string) {
    setIsFetching(true);
    dispatchFilter({ type: ActionEnum.UPDATE_OBJECT_FIELD, fieldName, subFieldName, value: Boolean(e) });
  }

  function clearField(fieldName: SearchStateKey) {
    setIsFetching(true);
    if (isSearchStateStringField(fieldName)) {
      dispatchFilter({ type: ActionEnum.CLEAR_STRING_FIELD, fieldName });
    } else if (isSearchStateObjectField(fieldName)) {
      dispatchFilter({ type: ActionEnum.CLEAR_OBJECT_FIELD, fieldName });
    }
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
      const leanFilter = deepPurgeEmptyFields(filter);
      const params = makeURLSearchParams(leanFilter);
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
    onArrayCheckedChange,
    isFetching,
    isError,
    clearField,
    clearFilters: () => dispatchFilter({ type: ActionEnum.FULL_RESET }),
  };
}
