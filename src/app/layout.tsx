import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./(pages)/header/page";
import Footer from "./(pages)/footer/page";

export const metadata: Metadata = {
  title: "Đấu giá trường sơn",
  description: "Your page description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
