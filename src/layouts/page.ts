import { setColorThemeOnPageLoad } from "@/lib/color-theme";

if (typeof window !== "undefined") {
  setColorThemeOnPageLoad();
}
