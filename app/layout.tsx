import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRAC Career Hub — Your next step starts here",
  description: "Explore careers, build job-ready skills and connect with verified opportunities through one personalised journey.",
  icons: { icon: "/favicon.svg" },
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
