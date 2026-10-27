"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Sparkles,
  CalendarClock,
  Heart,
  ChevronDown,
  User,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";

type Notif = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  title: string;
  detail: string;
  when: string;
  unread: boolean;
};

const INITIAL: Notif[] = [
  { id: 1, icon: Sparkles, color: "from-brand-500 to-teal-500", title: "Draft ready for approval", detail: "“We deleted 40% of our onboarding docs…”", when: "5m ago", unread: true },
  { id: 2, icon: CheckCheck, color: "from-emerald-400 to-teal-500", title: "Post published", detail: "“The fastest way to lose trust in a product…”", when: "2h ago", unread: true },
  { id: 3, icon: Heart, color: "from-pink-500 to-rose-500", title: "Engagement spike", detail: "Your last post crossed 300 reactions", when: "5h ago", unread: true },
  { id: 4, icon: CalendarClock, color: "from-sky-400 to-blue-600", title: "3 posts scheduled", detail: "Your week is queued and ready", when: "Yesterday", unread: false },
];

const MENU = [
  { label: "Profile", href: "/dashboard/settings", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function TopbarActions({
  name = "Jane Doe",
  email = "jane@company.com",
  initials = "JD",
}: {
  name?: string;
  email?: string;
  initials?: string;
}) {
  const [open, setOpen] = useState<"none" | "notif" | "user">("none");
  const [notifs, setNotifs] = useState(INITIAL);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen("none");
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen("none");
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const markAllRead = () =>
    setNotifs((arr) => arr.map((n) => ({ ...n, unread: false })));

  return (
    <div ref={ref} className="ml-auto flex items-center gap-3">
      {/* Notifications */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => (o === "notif" ? "none" : "notif"))}
          className="relative grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-700 shadow-sm transition-colors hover:text-flame"
          aria-label="Notifications"
          aria-expanded={open === "notif"}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-flame px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {open === "notif" && (
          <div className="animate-pop-in absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl bg-white/95 shadow-[var(--shadow-soft)] ring-1 ring-ink-100 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-bold text-ink-900">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 divide-y divide-ink-100 overflow-y-auto">
              {notifs.map((n) => (
                <button
                  key={n.id}
                  onClick={() =>
                    setNotifs((arr) =>
                      arr.map((x) => (x.id === n.id ? { ...x, unread: false } : x)),
                    )
                  }
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-brand-50 ${
                    n.unread ? "bg-brand-50/50" : ""
                  }`}
                >
                  <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ${n.color} text-white`}>
                    <n.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink-900">{n.title}</span>
                    <span className="block truncate text-xs text-muted">{n.detail}</span>
                    <span className="mt-0.5 block text-[11px] text-muted">{n.when}</span>
                  </span>
                  {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-flame" />}
                </button>
              ))}
            </div>
            <Link
              href="/dashboard/posts"
              onClick={() => setOpen("none")}
              className="block border-t border-ink-100 px-4 py-3 text-center text-sm font-semibold text-brand-600 hover:bg-brand-50"
            >
              View all
            </Link>
          </div>
        )}
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => (o === "user" ? "none" : "user"))}
          className="flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pl-1.5 pr-3 shadow-sm"
          aria-expanded={open === "user"}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-xs font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold text-ink-900 sm:block">{name}</span>
          <ChevronDown className={`h-4 w-4 text-muted transition-transform ${open === "user" ? "rotate-180" : ""}`} />
        </button>

        {open === "user" && (
          <div className="animate-pop-in absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl bg-white/95 shadow-[var(--shadow-soft)] ring-1 ring-ink-100 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-sm font-bold text-white">
                {initials}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-ink-900">{name}</div>
                <div className="truncate text-xs text-muted">{email}</div>
              </div>
            </div>
            <div className="border-t border-ink-100 py-1">
              {MENU.map((m) => (
                <Link
                  key={m.label}
                  href={m.href}
                  onClick={() => setOpen("none")}
                  className="group flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  <m.icon className="h-4 w-4 text-muted transition-colors group-hover:text-brand-600" />
                  {m.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-ink-100 py-1">
              <a
                href="/api/auth/logout"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
