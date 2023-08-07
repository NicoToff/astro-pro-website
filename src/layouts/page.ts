import { setColorThemeOnPageLoad } from "@/lib/color-theme";

if (typeof window !== "undefined") {
  setColorThemeOnPageLoad();
}

const yearSpan = document.querySelector("[data-current-year]");
if (yearSpan) {
  yearSpan.innerHTML = new Date().getFullYear().toString();
}
