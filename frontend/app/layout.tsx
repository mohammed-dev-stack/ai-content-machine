import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Content Machine | توليد محتوى إنستغرام بالذكاء الاصطناعي",
  description: "منصة ذكية لتوليد محتوى إنستغرام احترافي مع هاشتاغات مدروسة. أنشئ Hook, Caption, Hashtags في ثوانٍ.",
  keywords: "توليد محتوى, إنستغرام, ذكاء اصطناعي, تسويق, هاشتاغات, AI Content, Instagram Marketing",
  authors: [{ name: "AI Content Machine" }],
  creator: "AI Content Machine",
  publisher: "AI Content Machine",
  robots: "index, follow",
  openGraph: {
    title: "AI Content Machine | أنشئ محتوى يباع",
    description: "توليد محتوى إنستغرام احترافي بالذكاء الاصطناعي مع هاشتاغات مدروسة",
    type: "website",
    locale: "ar_AR",
    siteName: "AI Content Machine",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Machine | أنشئ محتوى يباع",
    description: "توليد محتوى إنستغرام احترافي بالذكاء الاصطناعي",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0f172a",
  colorScheme: "dark",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900">
        {children}
      </body>
    </html>
  );
}