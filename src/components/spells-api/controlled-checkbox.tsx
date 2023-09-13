import { Label } from "@/shadcn/ui/label";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";

import type { CheckedState } from "@radix-ui/react-checkbox";

export type CheckboxProps = {
  fieldName: string;
  value: boolean | string;
  onCheckedChange: (e: CheckedState) => void;
};
export function ControlledCheckbox({ fieldName, value, onCheckedChange }: CheckboxProps) {
  const label = capitalizeFirstLetter(fieldName);
  return (
    <div className="m-2 flex items-center space-x-2">
      <Label htmlFor={fieldName}>{label}</Label>
      <Checkbox checked={isTruthy(value)} name={fieldName} id={fieldName} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function isTruthy(value: boolean | string) {
  return value === true || (typeof value === "string" && value.toLowerCase() === "true");
}
