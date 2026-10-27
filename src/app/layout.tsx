import type { Metadata } from "next";
import { Baloo_2, Poppins } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const appUrl = process.env.APP_URL ?? "http://localhost:3000";
const title = "Postpilot — LinkedIn content on autopilot";
const description =
  "Postpilot learns your voice, drafts LinkedIn posts that sound like you, and schedules them. You approve over WhatsApp; we publish.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { default: title, template: "%s · Postpilot" },
  description,
  applicationName: "Postpilot",
  openGraph: {
    title,
    description,
    url: appUrl,
    siteName: "Postpilot",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col text-fg">{children}</body>
    </html>
  );
}
