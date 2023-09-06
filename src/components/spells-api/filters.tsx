import { FilterX } from "lucide-react";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";

import { SearchInput } from "./search-input.tsx";
import { ControlledSelect } from "./controlled-select.tsx";
import { ControlledCheckbox } from "./controlled-checkbox.tsx";

import { SCHOOLS, SOURCES, COMPONENTS } from "./constants.ts";
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
          onSelectChange={(e) => onSelectChange(e, "school" satisfies SearchStateKey)}
          onResetClick={() => clearField("school" satisfies SearchStateKey)}
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
            onResetClick={() => clearField(fieldName)}
            multiple
          />
        ))}
      </div>
    </>
  );
}
