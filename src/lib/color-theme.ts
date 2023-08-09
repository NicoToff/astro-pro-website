import { dataAttributes } from "@/lib/constants";

function setSwitchButtonText(theme: "light" | "dark") {
  const { colorSwitchButton, moonIcon, sunIcon } = dataAttributes;
  const toggleModeButton = document.querySelector(colorSwitchButton.selector);
  const moonElement = document.querySelector(moonIcon.selector);
  const sunElement = document.querySelector(sunIcon.selector);
  if (!toggleModeButton || !moonElement || !sunElement)
    throw new Error(`Either ${colorSwitchButton.selector}, ${moonIcon.selector}, or ${sunIcon.selector} not found`);
  if (theme === "dark") {
    moonElement.classList.remove("hidden");
    sunElement.classList.add("hidden");
    toggleModeButton.setAttribute("aria-label", "Switch to light mode");
    toggleModeButton.setAttribute("aria-checked", "true");
  } else {
    moonElement.classList.add("hidden");
    sunElement.classList.remove("hidden");
    toggleModeButton.setAttribute("aria-label", "Switch to dark mode");
    toggleModeButton.setAttribute("aria-checked", "false");
  }
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
