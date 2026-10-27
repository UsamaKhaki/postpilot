"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenLine,
  CalendarDays,
  FileText,
  BarChart3,
  Mic,
  Settings,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Composer", href: "/dashboard/composer", icon: PenLine },
  { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
  { label: "Posts", href: "/dashboard/posts", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Voice", href: "/dashboard/voice", icon: Mic },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/60 bg-white/70 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 text-ink-700 shadow-sm"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white/70 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-5">
          <Link href="/dashboard" className="hidden lg:block" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="mt-8 flex-1 space-y-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] text-white shadow-[0_12px_24px_-12px_rgba(255,45,85,0.7)]"
                      : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a
            href="/api/auth/logout"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </a>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
