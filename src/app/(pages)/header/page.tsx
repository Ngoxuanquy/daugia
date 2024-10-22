"use client";

import Login from "@/app/components/login/login";
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Sửa lỗi import useState
import Cookies from "js-cookie";
import { message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
              Liên Hệ: <span className="font-bold">01234657988</span>
            </div>
            <div>
              Email: <span className="font-bold">TranDaiHung@gmail.com</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="cursor-pointer" onClick={() => handleRegisterToSellAssets()}>
              Đăng ký bán tài sản
            </div>
            {fullName ? (
              <div className="flex justify-center mt-[2px]">
                <div className="ml-4px font-bold text-[14px] text-center mr-[20px]">
                  Giỏ hàng{" "}
                  <label className="w-[50px] ">
                    <ShoppingCartOutlined />
                  </label>
                </div>
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
        <div className="font-bold">
          <Link href={"/"}>
            <img
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/462535391_3771330939745233_3099731095223746077_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFEq_DmVSp78A4AQglB4xlbre-MXs-el_2t74xez56X_eW1eOcL9xWGvBUQmkrW07WgjfDG0Xjt8wLJb1AFwCS7&_nc_ohc=bRwtkI4AZX4Q7kNvgEH3zgD&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=A0x8nhjd0ZqykRE1_wVUwxa&oh=03_Q7cD1QFSBA9LTt5GMX6wXvgwMQcDbGmfJsGHB2oS6-oGDCSacg&oe=67398F29"
            />
          </Link>
        </div>{" "}
        {/* Thêm lớp font-bold */}
        <div className="flex space-x-8 items-center">
          <div className={getItemClass("Giới thiệu")} onClick={() => handleClick("Giới thiệu")}>
            <Link href="/">Giới thiệu</Link>
          </div>
          <div className={getItemClass("ĐG quyền sử dụng đất")} onClick={() => handleClick("ĐG quyền sử dụng đất")}>
            <Link href="/auction-room">Phòng đấu giá</Link>
          </div>
          <div className={getItemClass("Danh mục tài sản")} onClick={() => handleClick("Danh mục tài sản")}>
            <Link href="/asset-portfolio">Danh mục tài sản</Link>
          </div>
          <div className={getItemClass("Nạp tiền vào tài khoản")} onClick={() => handleClick("Nạp tiền vào tài khoản")}>
            <Link href="/pay">Nạp tiền vào tài khoản</Link>
          </div>
          <div className={getItemClass("Kết quả đấu giá")} onClick={() => handleClick("Kết quả đấu giá")}>
            <Link href="/auction-results">Kết quả đấu giá</Link>
          </div>
          <div
            className={`${getItemClass("Phòng đấu giá của tôi")} p-3.5 rounded-lg font-bold`}
            style={{
              background: "linear-gradient(90deg, #c90000, #ff4848)",
              color: "white",
            }}
          >
            <Link href="/accounts">Phòng đấu giá của tôi</Link>
          </div>
        </div>
      </div>
      <Login isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
