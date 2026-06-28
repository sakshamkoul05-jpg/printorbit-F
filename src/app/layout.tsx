import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "PrintOrbit | India's Premium Printing Platform",
  description: "Premium printing services for businesses, startups, and organizations. Business cards, packaging, banners, labels & more. Quality guaranteed.",
  keywords: ["printing services", "business cards", "packaging", "banners", "labels", "custom printing", "premium printing", "India"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
