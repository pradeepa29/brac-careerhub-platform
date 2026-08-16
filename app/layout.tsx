import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRAC Career Hub — আপনার পরবর্তী পদক্ষেপ এখান থেকেই",
  description: "ক্যারিয়ার অন্বেষণ করুন, চাকরির উপযোগী দক্ষতা গড়ুন এবং যাচাইকৃত সুযোগের সঙ্গে যুক্ত হোন।",
  icons: { icon: "/favicon.svg" },
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="bn"><body>{children}</body></html>;
}
