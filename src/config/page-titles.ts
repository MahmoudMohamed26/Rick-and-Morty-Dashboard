export type PageMeta = { title: string; description: string };

export const PAGE_TITLES: Record<string, PageMeta> = {
  characters: {
    title: "Characters",
    description: "Browse Rick & Morty characters",
  },
  episodes: {
    title: "Episodes",
    description: "Browse Rick & Morty episodes",
  },
  locations: {
    title: "Locations",
    description: "Browse Rick & Morty locations",
  },
  settings: {
    title: "Settings",
    description: "Dashboard settings",
  },
  profile: {
    title: "Profile",
    description: "Edit your profile",
  },
};

export const SUB_TITLES: Record<string, Record<string, PageMeta>> = {
  characters: {
    new: { title: "Add Character", description: "Add a new character" },
    edit: { title: "Edit Character", description: "Edit character details" },
    read: { title: "View Character", description: "Character details" },
  },
  episodes: {
    new: { title: "Add Episode", description: "Add a new episode" },
    edit: { title: "Edit Episode", description: "Edit episode details" },
    read: { title: "View Episode", description: "Episode details" },
  },
  locations: {
    new: { title: "Add Location", description: "Add a new location" },
    edit: { title: "Edit Location", description: "Edit location details" },
    read: { title: "View Location", description: "Location details" },
  },
};

export const FALLBACK_META: PageMeta = {
  title: "Dashboard",
  description: "",
};

const PAGE_ACTIONS = new Set(["new", "edit", "read"]);

export function resolvePageMeta(pathname: string): PageMeta {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const isId =
    segments.length > 1 && !PAGE_ACTIONS.has(last) && !(last in PAGE_TITLES);
  const action = isId ? segments[segments.length - 2] : last;
  const parent = isId
    ? segments[segments.length - 3]
    : segments[segments.length - 2];

  const subMeta = parent ? SUB_TITLES[parent]?.[action] : undefined;

  return subMeta ?? PAGE_TITLES[action] ?? PAGE_TITLES[last] ?? FALLBACK_META;
}
