"use client";

import CardUser from "@/app/components/cardUser/cardUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchApi from "@/app/utils/api";

const Accounts = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    address: "",
    moneys: 0, // Thêm trường tiền
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get("userId");
      const userResponse = await fetchApi(`/auth/getUser/${userId}`, "GET");

      console.log({ userResponse });

      // Kiểm tra phản hồi và thiết lập thông tin người dùng
      if (userResponse && userResponse.metadata) {
        const { fullName, email, phoneNumber, birthDate, address, moneys } = userResponse.metadata;
        setUserInfo({ fullName, email, phoneNumber, birthDate, address, moneys });
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-10 w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex">
          <CardUser />
          <div className="ml-6 flex-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Thông tin tài khoản</h1>
            <form className="mt-4">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.fullName}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ email:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.email}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.phoneNumber}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ngày sinh:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.birthDate.split("T")[0]}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.address}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Số tiền hiện có:</label>
                <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {userInfo.moneys} VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
