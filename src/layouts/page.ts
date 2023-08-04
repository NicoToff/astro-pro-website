import { getColorTheme, setColorTheme } from "@/lib/color-theme";

if (typeof window !== "undefined") {
  const colorTheme = getColorTheme();
  setColorTheme(colorTheme);
}
