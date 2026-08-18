import type { LucideIcon } from "lucide-react";
import { Users, Tv, MapPin } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Main",
    items: [
      {
        label: "Characters",
        path: "/dashboard/characters",
        icon: Users,
      },
      {
        label: "Episodes",
        path: "/dashboard/episodes",
        icon: Tv,
      },
      {
        label: "Locations",
        path: "/dashboard/locations",
        icon: MapPin,
      },
    ],
  },
];
