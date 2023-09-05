import { useEffect, useState, useReducer, useRef, type ChangeEvent } from "react";

import { SpellCard, SpellCardSkeleton } from "./spell-card";
import { SearchInput } from "./search-input";

import { useOnMount } from "../hooks/onMount";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Checkbox } from "@/shadcn/ui/checkbox";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { Button } from "@/shadcn/ui/button";
import { Trash } from "lucide-react";

import type { Spell } from "@/types/spell";
import type { CheckedState } from "@radix-ui/react-checkbox";

const ActionInit = "init" as const;
const ActionFullReset = "fullReset" as const;
const ActionTypeEnum = {
  UPDATE: "updateField",
  REMOVE: "removeField",
} as const;
type ActionType = (typeof ActionTypeEnum)[keyof typeof ActionTypeEnum];

const initialSearchState = {
  name: "",
  level: "",
  ritual: "",
  concentration: "",
  school: "",
  group: "",
  sources: "",
  components: "",
};

type SearchState = typeof initialSearchState;

type Action =
  | {
      type: ActionType;
      fieldName: keyof SearchState;
      value?: string;
    }
  | {
      type: typeof ActionInit;
      initValue: SearchState;
    }
  | {
      type: typeof ActionFullReset;
    };

function searchReducer(state: SearchState, action: Action) {
  switch (action.type) {
    case ActionInit:
      return action.initValue;
    case ActionTypeEnum.UPDATE:
      return { ...state, [action.fieldName]: action.value };
    case ActionTypeEnum.REMOVE: {
      return { ...state, [action.fieldName]: "" };
    }
    case ActionFullReset:
      return { ...initialSearchState };
    default:
      return state;
  }
}

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
    dispatchFilter({ type: ActionTypeEnum.UPDATE, fieldName: name as keyof SearchState, value });
  }

  function onCheckedChange(e: CheckedState, fieldName: keyof SearchState) {
    setIsFetching(true);
    const value = e.valueOf().toString();
    if (value === "true") {
      dispatchFilter({
        type: ActionTypeEnum.UPDATE,
        fieldName,
        value,
      });
    } else {
      dispatchFilter({
        type: ActionTypeEnum.REMOVE,
        fieldName,
      });
    }
  }

  function onValueChange(value: string, fieldName: keyof SearchState) {
    setIsFetching(true);
    dispatchFilter({ type: ActionTypeEnum.UPDATE, fieldName, value });
  }

  useOnMount(() => {
    const params = new URLSearchParams(window.location.search);
    const initValue: SearchState = { ...initialSearchState };
    for (const key of Object.keys(initialSearchState)) {
      const value = params.get(key);
      if (value) {
        initValue[key as keyof SearchState] = value;
      }
    }
    if (!filterIsEmpty(initValue)) {
      dispatchFilter({ type: ActionInit, initValue });
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
      const leanFilter = Object.entries(filter).filter(([, v]) => v !== "");
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
      <SearchInput
        isLoading={isFetching}
        value={filter.name}
        name={"name" satisfies SearchState["name"]}
        onChange={onChange}
        placeholder="Search by name..."
      />
      <div className="grid place-content-evenly md:grid-flow-col-dense">
        <div className="m-2 flex items-center space-x-2">
          <Label htmlFor={"level" satisfies SearchState["level"]} className="font-bold">
            {`Level`}
          </Label>
          <Input
            type="number"
            value={filter.level}
            name={"level" satisfies SearchState["level"]}
            id={"level" satisfies SearchState["level"]}
            onChange={onChange}
            min={0}
            max={9}
            className="w-[60px]"
          />
        </div>

        <div className="flex">
          <div className="m-2 flex items-center space-x-2">
            <Label htmlFor={"concentration" satisfies SearchState["concentration"]} className="font-bold">
              {`Concentration`}
            </Label>
            <Checkbox
              checked={filter.concentration === "true"}
              name={"concentration" satisfies SearchState["concentration"]}
              id={"concentration" satisfies SearchState["concentration"]}
              onCheckedChange={(e) => onCheckedChange(e, "concentration")}
            />
          </div>

          <div className="m-2 flex items-center space-x-2">
            <Label htmlFor={"ritual" satisfies SearchState["ritual"]} className="font-bold">
              {`Ritual`}
            </Label>
            <Checkbox
              checked={filter.ritual === "true"}
              name={"ritual" satisfies SearchState["ritual"]}
              id={"ritual" satisfies SearchState["ritual"]}
              onCheckedChange={(e) => onCheckedChange(e, "ritual")}
            />
          </div>
        </div>
        <div className="m-2 flex items-center space-x-2">
          <Label htmlFor={"school" satisfies SearchState["school"]} className="font-bold">
            {`School`}
          </Label>
          <Select
            
            value={filter.school}
            name={"school" satisfies SearchState["school"]}
            onValueChange={(value) => onValueChange(value, "school")}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={"Pick a school"} />
            </SelectTrigger>

            <SelectContent>
              {[
                "Abjuration",
                "Conjuration",
                "Divination",
                "Enchantment",
                "Evocation",
                "Illusion",
                "Necromancy",
                "Transmutation",
              ].map((school) => (
                <SelectItem value={school.toLowerCase()} key={school}>
                  {school}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={"secondary"}
            onClick={() => dispatchFilter({ type: ActionTypeEnum.REMOVE, fieldName: "school" })}
            disabled={filter.school === ""}
          >
            <Trash size={20} />
          </Button>
        </div>
      </div>

      <Button
        variant={"destructive"}
        onClick={() => dispatchFilter({ type: ActionFullReset })}
        disabled={filterIsEmpty(filter)}
        className="relative left-1/2 m-2 -translate-x-1/2 transform"
      >
        {`Reset Filters`}
      </Button>

      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length ? spells.map((s) => <SpellCard key={s.name} spell={s} />) : <SpellCardSkeleton />}
        </div>
      ) : !filterIsEmpty(filter) ? (
        <p className="mt-4 text-center text-xl">{`No spells found.`}</p>
      ) : null}
    </>
  );
}

function updateBrowserHistory(params: string) {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", encodeURI(`?${params}`));
  }
}

export function filterIsEmpty(filter: SearchState) {
  return Object.values(filter).every((v) => v === "");
}
