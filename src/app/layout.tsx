"use client";

// import type { Metadata } from "next";
import React, { createContext, useContext, useState } from "react";
import "./globals.css";
import Header from "./(pages)/header/page";
import Footer from "./(pages)/footer/page";
import { Spin } from "antd"; // Đảm bảo đường dẫn chính xác
// export const metadata: Metadata = {
//   title: "Đấu giá trường sơn",
//   description: "Your page description",
// };

// Tạo context cho loading
const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const useLoading = () => {
  return useContext(LoadingContext);
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <html lang="en">
        <body>
          {loading && (
            <div className="fixed inset-0 bg-black opacity-50 z-10 flex items-center justify-center">
              <Spin />
            </div>
          )}

          {/* Hiển thị spinner khi loading là true */}
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LoadingContext.Provider>
  );
}
