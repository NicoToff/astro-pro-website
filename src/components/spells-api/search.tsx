import { useEffect, useState, useReducer, useRef, type ChangeEvent } from "react";
import { FilterX } from "lucide-react";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";

import { SearchInput } from "./search-input";
import { ControlledSelect } from "./controlled-select";
import { ControlledCheckbox } from "./controlled-checkbox";

import { SCHOOLS, SOURCES, COMPONENTS, ActionEnum, initialSearchState, arrayFields } from "./constants";
import { SpellCard, SpellCardSkeleton } from "./spell-card";
import { filterIsEmpty, stringifyArrayFields, updateBrowserHistory } from "./helpers";
import { searchReducer } from "./reducer.ts";

import { useOnMount } from "../hooks/onMount";

import type { CheckedState } from "@radix-ui/react-checkbox";
import type { Spell } from "@/types/spell";
import type { Writeable } from "@/types/helpers";
import type { SearchState, SearchStateKey, SearchStateArrayField, SearchStateStringField } from "./types";

type SearchProps = {
  url: string;
};
export function Search({ url }: SearchProps) {
  const isFirstRender = useRef(true);

  const [filter, dispatchFilter] = useReducer(searchReducer, { ...initialSearchState });
  const [spells, setSpells] = useState<Spell[]>([]);
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
      setSpells([]);
      setIsFetching(false);
      updateBrowserHistory("");
      return;
    }

    const timeoutId = setTimeout(() => {
      const leanFilter = Object.entries(stringifyArrayFields(filter)).filter(([, v]) => v !== "");
      const params = new URLSearchParams(leanFilter).toString();
      updateBrowserHistory(params);

      fetch(`${url}?${params}`)
        .then((res) => res.json() as Promise<Spell[]>)
        .then((spells) => setSpells(spells))
        .catch((err) => {
          console.error(err);
          setSpells([]);
        })
        .finally(() => setIsFetching(false));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filter]);

  return (
    <>
      <div className="flex flex-row-reverse">
        <Button
          variant={"destructive"}
          onClick={() => dispatchFilter({ type: ActionEnum.FULL_RESET })}
          disabled={filterIsEmpty(filter)}
          className="relative mb-2 flex gap-1"
        >
          <div>{`Reset all filters`}</div>
          <FilterX size={20} />
        </Button>
      </div>

      <SearchInput
        isLoading={isFetching}
        value={filter.name}
        name={"name" satisfies SearchStateKey}
        onChange={onChange}
        placeholder="Search by name..."
      />

      <div className="flex flex-wrap justify-evenly">
        <div className="m-2 flex items-center space-x-2">
          <Label htmlFor={"level" satisfies SearchStateKey} className="font-bold">
            {`Level`}
          </Label>
          <Input
            type="number"
            value={filter.level}
            name={"level" satisfies SearchStateKey}
            id={"level" satisfies SearchStateKey}
            onChange={onChange}
            min={0}
            max={9}
            className="w-[60px]"
          />
        </div>

        <div className="flex">
          {[
            { fieldName: "concentration" as SearchStateStringField },
            { fieldName: "ritual" as SearchStateStringField },
          ].map(({ fieldName }) => (
            <ControlledCheckbox
              key={fieldName}
              fieldName={fieldName}
              value={filter[fieldName]}
              onCheckedChange={(e) => onCheckedChange(e, fieldName)}
            />
          ))}
        </div>

        <ControlledSelect
          fieldName={"school" satisfies SearchStateKey}
          value={filter.school}
          options={SCHOOLS}
          onSelectChange={(e) =>
            dispatchFilter({ fieldName: "school", type: ActionEnum.UPDATE, value: e.target.value })
          }
          onResetClick={() => dispatchFilter({ type: ActionEnum.REMOVE, fieldName: "school" })}
        />

        {[
          { fieldName: "sources" as SearchStateArrayField, options: SOURCES },
          { fieldName: "components" as SearchStateArrayField, options: COMPONENTS },
        ].map(({ fieldName, options }) => (
          <ControlledSelect
            key={fieldName}
            fieldName={fieldName}
            value={filter[fieldName]}
            options={options}
            onSelectChange={(e) => onSelectChange(e, fieldName)}
            onResetClick={() => dispatchFilter({ type: ActionEnum.REMOVE, fieldName })}
            multiple
          />
        ))}
      </div>

      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length ? spells.map((s) => <SpellCard key={s.name} spell={s} />) : <SpellCardSkeleton />}
        </div>
      ) : !filterIsEmpty(filter) ? (
        <div className="mt-4 rounded-md border border-secondary p-4 text-center text-xl">{`No spells found.`}</div>
      ) : null}
    </>
  );
}
