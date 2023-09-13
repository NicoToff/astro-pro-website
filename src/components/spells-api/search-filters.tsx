import { useState } from "react";
import { useOnMount } from "../hooks/use-on-mount.ts";

import { FilterX } from "lucide-react";
import {
  SCHOOLS,
  SOURCES,
  COMPONENTS,
  DAMAGE_TYPES,
  SPELL_LEVELS,
  type SpellLevel,
  type ComponentName,
} from "dnd-home-utils";

import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";

import { camelCaseToWords } from "@/lib/camel-case-to-words.ts";
import { cn } from "@/lib/utils.ts";

import { SearchInput } from "./search-input.tsx";
import { ControlledCheckbox } from "./controlled-checkbox.tsx";

import { MOBILE_AGENT_TAGS } from "./constants";
import { filterIsEmpty } from "./helpers.ts";

import type {
  SearchStateKey,
  SearchStateStringField,
  SearchState,
  SearchStateObjectField,
  SearchStateObjectFieldKey,
} from "./types.ts";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { ToString } from "@/types/helpers.ts";

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
  onArrayCheckedChange,
  clearField,
  clearFilters,
}: SearchFiltersProps) {
  const [isOnMobile, setIsOnMobile] = useState(false);
  const customItemBundle = { clearField, filter };

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
          <div>{`Clear all filters`}</div>
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
        <CustomAccordionItem
          value="sources"
          className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          {...customItemBundle}
        >
          {SOURCES.map((source) => (
            <ControlledCheckbox
              key={source}
              fieldName={source}
              value={filter.sources[source]}
              onCheckedChange={(e) => onArrayCheckedChange(e, "sources", source)}
            />
          ))}
        </CustomAccordionItem>

        <CustomAccordionItem value="level" className="grid-cols-3 md:grid-cols-5 lg:grid-cols-10" {...customItemBundle}>
          {SPELL_LEVELS.map((level) => {
            const levelString = level.toString() as ToString<typeof level>;
            return (
              <ControlledCheckbox
                key={levelString}
                fieldName={levelSchoolLabel(levelString)}
                value={filter.level[levelString]}
                onCheckedChange={(e) => onArrayCheckedChange(e, "level", levelString)}
              />
            );
          })}
        </CustomAccordionItem>

        <CustomAccordionItem value="school" className="grid-cols-2 sm:grid-cols-4" {...customItemBundle}>
          {SCHOOLS.map((school) => (
            <ControlledCheckbox
              key={school}
              fieldName={school}
              value={filter.school[school]}
              onCheckedChange={(e) => onArrayCheckedChange(e, "school", school)}
            />
          ))}
        </CustomAccordionItem>

        <CustomAccordionItem value="components" className="grid-cols-3" {...customItemBundle}>
          {COMPONENTS.map((component) => (
            <ControlledCheckbox
              key={component}
              fieldName={componentLabel(component)}
              value={filter.components[component]}
              onCheckedChange={(e) => onArrayCheckedChange(e, "components", component)}
            />
          ))}
        </CustomAccordionItem>

        <CustomAccordionItem
          value="damageTypes"
          className="grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          {...customItemBundle}
        >
          {DAMAGE_TYPES.map((damageType) => (
            <ControlledCheckbox
              key={damageType}
              fieldName={damageType}
              value={filter.damageTypes[damageType]}
              onCheckedChange={(e) => onArrayCheckedChange(e, "damageTypes", damageType)}
            />
          ))}
        </CustomAccordionItem>

        <AccordionItem value="concentration-ritual">
          <AccordionTrigger>Other filters</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-end">
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
      </Accordion>
    </>
  );
}

type CustomAccordionItemProps = {
  value: SearchStateObjectField;
  children: React.ReactNode;
  className?: string;
  clearField: (fieldName: SearchStateKey) => void;
  filter: SearchState;
};
export function CustomAccordionItem({ value, clearField, filter, children, className }: CustomAccordionItemProps) {
  const numSelected = Object.values(filter[value]).filter(Boolean).length;
  const numSelectedText = numSelected ? ` (${numSelected})` : "";
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{`${camelCaseToWords(value)}${numSelectedText}`}</AccordionTrigger>
      <AccordionContent>
        <div className={cn("grid place-items-end overflow-x-auto", className)}>{children}</div>
        <div className="mr-2 mt-1 flex justify-end">
          <Button className="place-content-end" variant="secondary" onClick={() => clearField(value)}>
            {`Clear`}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function levelSchoolLabel(spellLevel: ToString<SpellLevel>) {
  switch (spellLevel) {
    case "0":
      return `Cantrip`;
    case "1":
      return `1st`;
    case "2":
      return `2nd`;
    case "3":
      return `3rd`;
    default:
      return `${spellLevel}th`;
  }
}

function componentLabel(component: ComponentName) {
  switch (component.toUpperCase()) {
    case "V":
      return "Verbal";
    case "S":
      return "Somatic";
    case "M":
      return "Material";
    default:
      return component;
  }
}
