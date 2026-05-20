export function openCookiePreferences() {
  if (typeof window === "undefined") return
  import("vanilla-cookieconsent").then((m) => m.showPreferences())
}
