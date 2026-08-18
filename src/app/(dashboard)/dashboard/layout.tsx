import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./_components/SideBar";
import NavBar from "./_components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
