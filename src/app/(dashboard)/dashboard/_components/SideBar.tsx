"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "@/config/nav";
import logo from "@/assets/logo.png";

const AppSidebar = () => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="border-b border-border/70 min-h-16 justify-center">
        <Link href="/dashboard" className="flex items-center justify-center py-1">
          <div className="max-w-20">
            <img src={logo.src} alt="Rick & Morty Dashboard" />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

                return (
                  <SidebarMenuItem key={item.path}>
                    <Link href={item.path} onClick={handleItemClick}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        className={cn(
                          "relative rounded-sm!",
                          isActive && "bg-primary! text-primary-foreground!",
                        )}
                      >
                        <item.icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className={cn(
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground",
                          )}
                        />
                        <span className="flex flex-1 items-center gap-2 group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-3 text-xs text-muted-foreground text-center group-data-[collapsible=icon]:hidden">
          Rick & Morty Dashboard
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
