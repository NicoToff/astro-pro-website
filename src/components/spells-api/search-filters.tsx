import { useState } from "react";
import { useOnMount } from "../hooks/use-on-mount.ts";

import { FilterX } from "lucide-react";
import { SCHOOLS, SOURCES, COMPONENTS, DAMAGE_TYPES } from "dnd-home-utils";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";

import { SearchInput } from "./search-input.tsx";
import { ControlledSelect } from "./controlled-select.tsx";
import { ControlledCheckbox } from "./controlled-checkbox.tsx";

import { MOBILE_AGENT_TAGS } from "./constants";
import { filterIsEmpty } from "./helpers.ts";

import type {
  SearchStateKey,
  SearchStateArrayField,
  SearchStateStringField,
  SearchState,
  SearchStateObjectField,
} from "./types.ts";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type SearchFiltersProps = {
  filter: SearchState;
  isFetching: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange: (e: CheckedState, fieldName: SearchStateStringField) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, fieldName: SearchStateKey) => void;
  onArrayCheckedChange: (e: CheckedState, fieldName: SearchStateObjectField, subFieldName: string) => void;
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
  onArrayCheckedChange,
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
      <Accordion type="multiple" className="not-prose w-full">
        <AccordionItem value="spell-sources">
          <AccordionTrigger>Spell sources</AccordionTrigger>
          <AccordionContent>
            {SOURCES.map((source) => (
              <ControlledCheckbox
                key={source}
                fieldName={source}
                value={filter.sources[source]}
                onCheckedChange={(e) => onArrayCheckedChange(e, "sources", source)}
              />
            ))}
            {/* <ControlledSelect
              className="row-span-4 lg:row-span-2"
              fieldName={"sources" satisfies SearchStateArrayField}
              value={filter.sources}
              options={SOURCES}
              onSelectChange={(e) => onSelectChange(e, "sources")}
              onResetClick={() => clearField("sources")}
              isOnMobile={isOnMobile}
              multiple
            /> */}
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="level">
          <AccordionTrigger>Level</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="school">
          <AccordionTrigger>School</AccordionTrigger>
          <AccordionContent>
            <ControlledSelect
              fieldName={"school" satisfies SearchStateKey}
              value={filter.school}
              options={SCHOOLS}
              onSelectChange={(e) => onSelectChange(e, "school" satisfies SearchStateKey)}
              onResetClick={() => clearField("school" satisfies SearchStateKey)}
              isOnMobile={isOnMobile}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="concentration-ritual">
          <AccordionTrigger>Concentration / Ritual</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="components">
          <AccordionTrigger>Components</AccordionTrigger>
          <AccordionContent>
            <ControlledSelect
              fieldName={"components" satisfies SearchStateArrayField}
              value={filter.components}
              options={COMPONENTS}
              onSelectChange={(e) => onSelectChange(e, "components")}
              onResetClick={() => clearField("components")}
              isOnMobile={isOnMobile}
              multiple
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="damage-types">
          <AccordionTrigger>Damage types</AccordionTrigger>
          <AccordionContent>
            <ControlledSelect
              fieldName={"damageTypes" satisfies SearchStateArrayField}
              value={filter.damageTypes}
              options={DAMAGE_TYPES}
              onSelectChange={(e) => onSelectChange(e, "damageTypes")}
              onResetClick={() => clearField("damageTypes")}
              isOnMobile={isOnMobile}
              multiple
            />
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </>
  );
}
