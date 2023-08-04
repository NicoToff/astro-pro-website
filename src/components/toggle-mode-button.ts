import { switchColorTheme } from "@/lib/color-theme";
import { dataAttributes } from "@/lib/constants";

document.querySelector(dataAttributes.colorSwitchButton.selector)?.addEventListener("click", () => {
  switchColorTheme();
});
