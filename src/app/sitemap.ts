import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.APP_URL.replace(/\/$/, "");
  const routes = [
    "",
    "/features",
    "/pricing",
    "/faq",
    "/contact",
    "/about",
    "/login",
    "/privacy",
    "/terms",
    "/refund-policy",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
