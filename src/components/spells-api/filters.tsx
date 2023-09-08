import { useState } from "react";
import { useOnMount } from "../hooks/use-on-mount.ts";

import { FilterX } from "lucide-react";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";

import { SearchInput } from "./search-input.tsx";
import { ControlledSelect } from "./controlled-select.tsx";
import { ControlledCheckbox } from "./controlled-checkbox.tsx";

import { SCHOOLS, SOURCES, COMPONENTS, MOBILE_AGENT_TAGS } from "./constants.ts";
import { filterIsEmpty } from "./helpers.ts";

import type { SearchStateKey, SearchStateArrayField, SearchStateStringField, SearchState } from "./types.ts";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type SearchFiltersProps = {
  filter: SearchState;
  isFetching: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange: (e: CheckedState, fieldName: SearchStateStringField) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, fieldName: SearchStateKey) => void;
  clearField: (fieldName: SearchStateKey) => void;
  clearFilters: () => void;
  isOnMobile?: boolean;
};

export function SearchFilters({
  filter,
  isFetching,
  onChange,
  onCheckedChange,
  onSelectChange,
  clearField,
  clearFilters,
}: SearchFiltersProps) {
  const [isOnMobile, setIsOnMobile] = useState(false);
  useOnMount(() => {
    if (!window.navigator) return;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = MOBILE_AGENT_TAGS.some((tag) => userAgent.includes(tag));
    if (isMobile) setIsOnMobile(true);
  });

  return (
    <>
      <div className="flex flex-row-reverse">
        <Button
          variant={"destructive"}
          onClick={clearFilters}
          disabled={filterIsEmpty(filter)}
          className="relative mb-2 flex gap-1"
        >
          <div>{`Reset all filters`}</div>
          <FilterX size={20} />
        </Button>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="search-input" className="text-md ml-2">{`Search`}</Label>
        <SearchInput
          id="search-input"
          isLoading={isFetching}
          value={filter.name}
          name={"name" satisfies SearchStateKey}
          onChange={onChange}
          placeholder="Search by name..."
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 lg:place-items-center">
        <ControlledSelect
          className="row-span-4 lg:row-span-2"
          fieldName={"sources" satisfies SearchStateArrayField}
          value={filter.sources}
          options={SOURCES}
          onSelectChange={(e) => onSelectChange(e, "sources")}
          onResetClick={() => clearField("sources")}
          isOnMobile={isOnMobile}
          multiple
        />

        <div className="m-2 flex items-center space-x-2">
          <Label htmlFor={"level" satisfies SearchStateKey}>{`Level`}</Label>
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

        <ControlledSelect
          fieldName={"school" satisfies SearchStateKey}
          value={filter.school}
          options={SCHOOLS}
          onSelectChange={(e) => onSelectChange(e, "school" satisfies SearchStateKey)}
          onResetClick={() => clearField("school" satisfies SearchStateKey)}
          isOnMobile={isOnMobile}
        />

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
          fieldName={"components" satisfies SearchStateArrayField}
          value={filter.components}
          options={COMPONENTS}
          onSelectChange={(e) => onSelectChange(e, "components")}
          onResetClick={() => clearField("components")}
          isOnMobile={isOnMobile}
          multiple
        />
      </div>
    </>
  );
}
