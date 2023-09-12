import { Label } from "@/shadcn/ui/label";
import { Checkbox } from "@/shadcn/ui/checkbox";

import type { CheckedState } from "@radix-ui/react-checkbox";

export type CheckboxProps = {
  fieldName: string;
  value: boolean;
  onCheckedChange: (e: CheckedState) => void;
};
export function ControlledCheckbox({ fieldName, value, onCheckedChange }: CheckboxProps) {
  const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  return (
    <div className="m-2 flex items-center space-x-2">
      <Label htmlFor={fieldName}>{label}</Label>
      <Checkbox checked={value === true} name={fieldName} id={fieldName} onCheckedChange={onCheckedChange} />
    </div>
  );
}
