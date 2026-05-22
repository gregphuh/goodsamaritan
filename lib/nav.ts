// Top nav — focused on what a donor needs to verify before giving.
// Projects + Mission Trips live as home-page sections (and as deeper
// pages reachable via section CTAs and the footer).
export const TOP_NAV_ITEMS = [
  { key: "missionTrips" as const, href: "/mission-trips" },
  { key: "volunteer" as const, href: "/volunteer" },
  { key: "accountability" as const, href: "/accountability" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
];

// Footer — fuller discovery surface. Lists everything the top nav doesn't.
// Accountability lives under "Trust & legal" in the footer, not here.
export const FOOTER_NAV_ITEMS = [
  { key: "about" as const, href: "/about" },
  { key: "ministries" as const, href: "/ministries" },
  { key: "missionTrips" as const, href: "/mission-trips" },
  { key: "volunteer" as const, href: "/volunteer" },
  { key: "contact" as const, href: "/contact" },
];

// Backward-compat — some places still import NAV_ITEMS. Defaults to top.
export const NAV_ITEMS = TOP_NAV_ITEMS;

export type NavKey = (typeof FOOTER_NAV_ITEMS)[number]["key"];
