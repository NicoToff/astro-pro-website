import { dataAttributes } from "@/lib/constants";

const { selector } = dataAttributes.colorSwitchButton;

function setSwitchButtonText(theme: "light" | "dark") {
  const toggleModeButton = document.querySelector(selector);
  if (!toggleModeButton) throw new Error(`No ${selector} attribute found`);
  toggleModeButton.innerHTML = theme === "dark" ? "Dark" : "Light";
}

export function setColorThemeOnPageLoad() {
  const html = document.documentElement;
  if (!html) throw new Error("No <html> element found");
  const theme = localStorage.getItem("color-theme");
  const isDark = theme === "dark";
  if (isDark) {
    html.classList.toggle("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.removeItem("color-theme");
  }
  setSwitchButtonText(isDark ? "dark" : "light");
}

export function switchColorTheme() {
  const html = document.documentElement;
  if (!html) throw new Error("No <html> element found");
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  theme === "dark" ? localStorage.setItem("color-theme", "dark") : localStorage.removeItem("color-theme");
  setSwitchButtonText(theme);
}
