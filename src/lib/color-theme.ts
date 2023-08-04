import { dataAttributes } from "@/lib/constants";

const { selector } = dataAttributes.colorSwitchButton;

export function getColorTheme() {
  const theme = localStorage.getItem("color-theme");
  return theme === "dark" ? "dark" : "light";
}

function setSwitchButton(theme: "light" | "dark") {
  const toggleModeButton = document.querySelector(selector);
  if (!toggleModeButton) throw new Error(`No ${selector} attribute found`);
  toggleModeButton.textContent = theme === "dark" ? "Dark" : "Light";
}

export function setColorTheme(theme: "light" | "dark") {
  const html = document.documentElement;
  if (!html) throw new Error("No <html> element found");
  html.classList.remove("dark", "light");
  html.classList.add(theme);
  setSwitchButton(theme);
  theme === "dark" ? localStorage.setItem("color-theme", "dark") : localStorage.removeItem("color-theme");
}

export function switchColorTheme() {
  const html = document.documentElement;
  if (!html) throw new Error("No <html> element found");
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  theme === "dark" ? localStorage.setItem("color-theme", "dark") : localStorage.removeItem("color-theme");
  setSwitchButton(theme);
}
