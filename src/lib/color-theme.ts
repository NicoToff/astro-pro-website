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
  const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = userPrefersDark || theme === "dark";
  if (isDark) {
    html.classList.toggle("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.removeItem("color-theme");
  }
  const currentTheme = isDark ? "dark" : "light";
  setSwitchButtonText(currentTheme);
  showRelevantImage(currentTheme);
}

export function switchColorTheme() {
  const html = document.documentElement;
  if (!html) throw new Error("No <html> element found");
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  theme === "dark" ? localStorage.setItem("color-theme", "dark") : localStorage.removeItem("color-theme");
  setSwitchButtonText(theme);
  showRelevantImage(theme);
}

function showRelevantImage(theme: "light" | "dark") {
  const { imageOnLight, imageOnDark } = dataAttributes;
  const lightThemeImages = document.querySelectorAll(imageOnLight.selector);
  const darkThemeImages = document.querySelectorAll(imageOnDark.selector);
  if (!lightThemeImages.length && !darkThemeImages.length) return;

  const show = (element: Element) => element.classList.add("md:block");
  const hide = (element: Element) => element.classList.remove("md:block");
  if (theme === "dark") {
    lightThemeImages.forEach(hide);
    darkThemeImages.forEach(show);
  } else {
    lightThemeImages.forEach(show);
    darkThemeImages.forEach(hide);
  }
}
