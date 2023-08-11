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
  sunIcon: {
    props: { "data-sun-icon": "" },
    selector: "[data-sun-icon]",
  } as const satisfies DataAttribute,
  moonIcon: {
    props: { "data-moon-icon": "" },
    selector: "[data-moon-icon]",
  } as const satisfies DataAttribute,
  imageOnLight: {
    props: { "data-image-on-light": "" },
    selector: "[data-image-on-light]",
  } as const satisfies DataAttribute,
  imageOnDark: {
    props: { "data-image-on-dark": "" },
    selector: "[data-image-on-dark]",
  } as const satisfies DataAttribute,
} as const;
