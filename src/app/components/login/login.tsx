"use client";

import fetchApi from "@/app/utils/api";
import { Modal, message } from "antd"; // Import message từ antd
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

type LoginProps = {
  isModalOpen: boolean;
  onClose: () => void; // Callback để đóng Modal từ component cha
};

const Login = ({ isModalOpen: initialIsModalOpen, onClose }: LoginProps) => {
  const [isModalOpen, setIsModalOpen] = useState(initialIsModalOpen);
  const [email, setPhoneNumber] = useState(""); // State cho số điện thoại
  const [password, setPassword] = useState(""); // State cho mật khẩu

  // Đồng bộ trạng thái của Modal khi nhận giá trị mới từ props
  useEffect(() => {
    setIsModalOpen(initialIsModalOpen);
  }, [initialIsModalOpen]);

  const handleOk = () => {
    setIsModalOpen(false);
    onClose(); // Gọi callback để cập nhật trạng thái bên component cha
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose(); // Gọi callback để cập nhật trạng thái bên component cha
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const response = await fetchApi("/auth/login", "POST", { email, password });

      // Giả sử API trả về thông tin người dùng và token

      // Lưu thông tin vào localStorage hoặc cookie
      Cookies.set("fullName", email, { expires: 7 }); // Hết hạn sau 7 ngày
      Cookies.set("userId", response.metadata.user._id, { expires: 7 }); // Hết hạn sau 7 ngày

      Cookies.set("token", response.metadata.tokens.accessToken, { expires: 7 });

      message.success("Đăng nhập thành công!"); // Hiển thị thông báo thành công
      handleOk(); // Đóng modal
    } catch (error) {
      message.error(`Đăng nhập thất bại: ${error}`); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="p-4">
          <div className="font-bold text-center mb-4 text-customRed text-[30px] ">Đăng Nhập</div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              value={email} // Liên kết với state
              onChange={(e) => setPhoneNumber(e.target.value)} // Cập nhật state khi nhập
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password} // Liên kết với state
              onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi nhập
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div>
            <button
              onClick={handleLogin} // Gọi hàm handleLogin khi nhấn nút
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Đăng Nhập
            </button>
          </div>

          <div className="text-center mt-4">
            <div className="text-sm">
              Bạn chưa có tài khoản? <span className="text-blue-500 hover:underline cursor-pointer">Đăng ký ngay</span>
            </div>
            <div className="text-sm mt-2 text-blue-500 hover:underline cursor-pointer">Quên mật khẩu</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
