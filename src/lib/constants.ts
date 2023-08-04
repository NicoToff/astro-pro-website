type DataAttribute = {
  props: {
    [key: string]: string;
  };
  selector: string;
};

export const dataAttributes = {
  colorSwitchButton: {
    props: { "data-switch-theme": "" },
    selector: "[data-switch-theme]",
  } as const satisfies DataAttribute,
} as const;
