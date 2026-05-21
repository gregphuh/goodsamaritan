// Shared navigation map. Labels resolved via Nav.* translations at render.
export const NAV_ITEMS = [
  { key: "about" as const, href: "/about" },
  { key: "projects" as const, href: "/projects" },
  { key: "stories" as const, href: "/stories" },
  { key: "missionTrips" as const, href: "/mission-trips" },
  { key: "contact" as const, href: "/contact" },
];

export type NavKey = (typeof NAV_ITEMS)[number]["key"];
