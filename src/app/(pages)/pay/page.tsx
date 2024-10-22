"use client";

import fetchApi from "@/app/utils/api";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Pay = () => {
  // Khai báo state để lưu số tiền nạp
  const [amount, setAmount] = useState("");
  const [userInfo, setUserInfo] = useState({
    moneys: 0, // Thêm trường tiền
  });
  const fetchUserData = async () => {
    const userId = Cookies.get("userId");
    const userResponse = await fetchApi(`/auth/getUser/${userId}`, "GET");

    console.log({ userResponse });

    // Kiểm tra phản hồi và thiết lập thông tin người dùng
    if (userResponse && userResponse.metadata) {
      const { moneys } = userResponse.metadata;
      setUserInfo({ moneys });
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const formatCurrency = (value: any) => {
    if (!value) return "";
    // Chuyển đổi giá trị thành số và định dạng thành chuỗi VNĐ
    return Number(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "").trim();
  };

  const handleAmountChange = (e: any) => {
    const rawValue = e.target.value;
    // Giữ lại các ký tự số và dấu phẩy
    const numericValue = rawValue.replace(/[^0-9]/g, ""); // Chỉ giữ số
    if (numericValue !== "") {
      setAmount(formatCurrency(numericValue)); // Cập nhật giá trị hiển thị với định dạng VNĐ
    } else {
      setAmount(""); // Nếu không hợp lệ, xóa ô input
    }
  };

  // Hàm xử lý khi người dùng nhấn nút nạp tiền
  const handlePayment = async () => {
    const parsedAmount = parseFloat(amount); // or use Number(amount)

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ.");
      return;
    }
    const numericAmount = parseInt(amount.toString().replace(".", "")); // Xóa dấu phẩy
    const response = await fetchApi("/pay/create-payment-link-donet", "POST", {
      userId: Cookies.get("userId"),
      amount: numericAmount,
    });
    if (response) {
      // Mở liên kết trong tab mới
      window.location.href = response;
    } else {
      alert("Không tìm thấy liên kết thanh toán.");
    }
  };

  useEffect(() => {
    const donePay = fetchApi("/pay/statusDonet", "GET");
    console.log({ donePay });
  }, []);

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-[-200px]">
        <h2 className="text-2xl font-semibold text-center mb-4">Nạp tiền vào tài khoản</h2>
        <label className="block text-gray-700 mb-4 text-center">
          Số tiền hiện có:{" "}
          <span className="font-semibold text-green-600">
            {userInfo.moneys.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
        </label>
        <label className="block text-gray-700 mb-2">Nhập số tiền muốn nạp:</label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Nhập số tiền"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition duration-300"
        >
          Nạp tiền
        </button>
      </div>
    </div>
  );
};

export default Pay;
