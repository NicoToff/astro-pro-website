import { FilterX } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";

import type { ChangeEventHandler, MouseEventHandler } from "react";

type SingleSelect = { value: string; multiple?: false };
type MultiSelect = { value: string[]; multiple: true };
export type SelectProps = {
  fieldName: string;
  options: string[] | readonly string[];
  onSelectChange: ChangeEventHandler<HTMLSelectElement>;
  onResetClick: MouseEventHandler<HTMLButtonElement>;
  isOnMobile?: boolean;
} & (SingleSelect | MultiSelect);
export function ControlledSelect({
  fieldName,
  value,
  options,
  onSelectChange,
  onResetClick,
  isOnMobile = false,
  multiple = false,
}: SelectProps) {
  const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

  return (
    <div className="m-2 flex items-center space-x-2">
      <Label htmlFor={fieldName} className="font-bold">
        {label}
      </Label>
      <select
        value={value}
        id={fieldName}
        name={fieldName}
        onChange={onSelectChange}
        className={
          // On mobile, the list of options is not spread out, there is only one line stating "X selected"
          cn(
            multiple && !isOnMobile ? "h-20" : "h-10",
            "w-fit rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )
        }
        multiple={multiple}
      >
        {
          // No need for an empty option when users can just unselect all options
          !multiple ? <option value="" aria-placeholder={`No ${fieldName} selected`}></option> : null
        }
        {options.map((opt) => (
          <option value={opt.toLowerCase()} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={onResetClick}
        disabled={Array.isArray(value) ? value.length === 0 : value === ""}
      >
        <FilterX size={20} />
      </Button>
    </div>
  );
}
