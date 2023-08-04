import { darkMode } from "@/store";

document.querySelector("[data-switch-theme]")?.addEventListener("click", () => {
  const html = document.querySelector("html");
  if (!html) throw new Error("No <html> element found");
  html.classList.toggle("dark");
  html.classList.contains("dark") ? darkMode.set(true) : darkMode.set(false);
  const toggleModeButton = document.querySelector("[data-switch-theme]");
  if (!toggleModeButton) throw new Error("No [data-switch-theme] attribute found");
  toggleModeButton.textContent = darkMode.value ? "Dark" : "Light";
});
