"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { resolvePageMeta } from "@/config/page-titles";

const NavBar = () => {
  const pathname = usePathname();
  const meta = resolvePageMeta(pathname);

  return (
    <header className="sticky bg-sidebar top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 gap-4 backdrop-blur-xl border-b border-border/70">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-accent" />
        <div>
          <h1 className="text-base font-bold leading-none text-foreground">
            {meta.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {meta.description}
          </p>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
