import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { TopbarActions } from "@/components/dashboard/topbar-actions";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <DashboardNav />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 hidden items-center gap-4 bg-white/50 px-6 py-4 backdrop-blur-xl lg:flex">
          <div className="flex h-10 max-w-md flex-1 items-center gap-2 rounded-full bg-white/80 px-4 text-sm text-muted shadow-sm">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search posts, drafts, analytics…"
              className="w-full bg-transparent outline-none placeholder:text-muted/70"
            />
          </div>
          <TopbarActions name={user.name} email={user.email} initials={user.initials} />
        </header>

        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
