"use client";

import Login from "@/app/components/login/login";
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Sửa lỗi import useState
import Cookies from "js-cookie";
import { message } from "antd";

const Header = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Lấy fullName từ cookie
    const storedFullName = Cookies.get("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const storedFullName = Cookies.get("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
    setIsModalOpen(false);
  };

  const [selected, setSelected] = useState("");

  const handleClick = (item: string) => {
    setSelected(item);
  };

  const getItemClass = (item: string) => `font-bold cursor-pointer ${selected === item ? "text-blue-500" : "text-black"}`;

  const handerLogOut = () => {
    const cookies = document.cookie.split(";");

    // Lặp qua từng cookie và xóa nó
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    window.location.reload();
  };

  const handleRegisterToSellAssets = () => {
    // Lấy danh sách cookie
    const cookies = document.cookie.split(";");

    // Tìm cookie chứa token
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith("token="));

    if (tokenCookie) {
      // Nếu có token, chuyển hướng đến trang đăng ký
      window.location.href = "/register-for-auction";
    } else {
      messageApi.open({
        type: "error",
        content: `Bạn cần đăng nhập để đăng ký bán tài sản.`,
      });
      // Nếu không có token, hiển thị thông báo hoặc chuyển hướng đến trang đăng nhập
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full">
      {contextHolder}
      <div className="bg-customRed p-2.5  mx-auto text-x text-white">
        <div className="flex justify-around w-full items-center">
          <div className="flex space-x-4">
            <div>
              Liên Hệ: <span className="font-bold">121</span>
            </div>
            <div>
              Email: <span className="font-bold">abc@gmail.com</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="cursor-pointer" onClick={() => handleRegisterToSellAssets()}>
              Đăng ký bán tài sản
            </div>
            {fullName ? (
              <div className="flex justify-center mt-[2px]">
                <div className="ml-4px font-bold text-[14px] text-center">{fullName}</div>
                <div className="ml-4px font-bold text-[14px] text-center ml-[15px] cursor-pointer" onClick={() => handerLogOut()}>
                  Đăng xuất
                </div>
              </div>
            ) : (
              <>
                <div className="cursor-pointer">
                  <span className="text-xs font-bold" onClick={openModal}>
                    Đăng Nhập
                  </span>
                </div>
                <div className="cursor-pointer">
                  <Link href={`\singup`}>
                    <span className="text-xs font-bold">Đăng ký</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center p-4 shadow-lg">
        <div className="font-bold">Logo</div> {/* Thêm lớp font-bold */}
        <div className="flex space-x-8 items-center">
          <div className={getItemClass("Giới thiệu")} onClick={() => handleClick("Giới thiệu")}>
            <Link href="/">Giới thiệu</Link>
          </div>
          {/* Thêm lớp font-bold */}
          <div className={getItemClass("ĐG quyền sử dụng đất")} onClick={() => handleClick("ĐG quyền sử dụng đất")}>
            <Link href={`\auction-room`}>Phòng đấu giá</Link>
          </div>
          <div className={getItemClass("Danh mục tài sản")} onClick={() => handleClick("Danh mục tài sản")}>
            <Link href={`\asset-portfolio`}>Danh mục tài sản</Link>
          </div>
          <div className={getItemClass("Thông báo đấu giá")} onClick={() => handleClick("Nạp tiền vào tài khoản")}>
            <Link href={`\pay`}>Nạp tiền vào tài khoản</Link>
          </div>
          <div className={getItemClass("Kết quả đấu giá")} onClick={() => handleClick("Kết quả đấu giá")}>
            <Link href={`\auction-results`}>Kết quả đấu giá</Link>
          </div>
          <div
            className="p-3.5 rounded-lg font-bold" // Thêm lớp font-bold
            style={{
              background: "linear-gradient(90deg, #c90000, #ff4848)",
              color: "white",
            }}
          >
            <Link href="\accounts">Phòng đấu giá của tôi</Link>
          </div>
        </div>
      </div>
      <Login isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
