import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "PrintOrbit | Online Printing & Corporate Gifting Solutions",
  description: "Customised online printing and gifting solutions for corporates & SMEs. Get personalised company branded products with your business name & logo.",
  keywords: ["printing services", "business cards", "packaging", "banners", "labels", "custom printing", "premium printing", "India"],
  icons: {
    icon: "/logo-printorbit.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
