"use client";

import React, { useState } from "react";
import { message } from "antd"; // Ensure import message from antd
import fetchApi from "@/app/utils/api";
import Cookies from "js-cookie";
import { useLoading } from "@/app/layout";

const RegisterForAuction = () => {
  // State declarations
  const { setLoading } = useLoading();
  const [itemName, setItemName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assetType, setAssetType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0]; // Lấy tệp đầu tiên từ input

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Cập nhật state với hình ảnh đã đọc
      };
      reader.readAsDataURL(selectedFile); // Đọc tệp dưới dạng URL
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Kiểm tra xác thực dữ liệu
      if (!itemName || !phoneNumber || !quantity || !price || !startDate || !endDate || !assetType || !file) {
        message.error("Vui lòng điền tất cả các trường bắt buộc."); // Thông báo nếu có trường chưa được điền
        setLoading(false);
        return; // Dừng hàm nếu xác thực không thành công
      }

      // Kiểm tra số điện thoại (có thể điều chỉnh theo định dạng bạn muốn)
      const phoneRegex = /^[0-9]{10,15}$/; // Ví dụ, chỉ cho phép số từ 10 đến 15 chữ số
      if (!phoneRegex.test(phoneNumber)) {
        message.error("Số điện thoại không hợp lệ. Vui lòng nhập lại."); // Thông báo nếu số điện thoại không hợp lệ
        setLoading(false);
        return; // Dừng hàm nếu xác thực không thành công
      }

      // Kiểm tra giá và số lượng
      if (isNaN(quantity) || quantity <= 0) {
        message.error("Số lượng phải là số dương."); // Thông báo nếu số lượng không hợp lệ
        setLoading(false);
        return; // Dừng hàm nếu xác thực không thành công
      }

      if (isNaN(price) || price <= 0) {
        message.error("Giá tài sản phải là số dương."); // Thông báo nếu giá không hợp lệ
        setLoading(false);
        return; // Dừng hàm nếu xác thực không thành công
      }

      // Tạo đối tượng request body với dữ liệu đăng ký
      const requestBody = {
        userId: Cookies.get("userId"), // Lấy userId từ cookie
        itemName,
        phoneNumber,
        quantity,
        startPrice: price,
        startDate,
        endDate,
        assetType,
        description,
      };

      // Nếu có file, gán nó vào request body
      if (file) {
        requestBody.file = file; // Gán file đã được chuyển đổi vào requestBody
      }

      // Gọi API với token trong headers
      const response = await fetchApi("/room", "POST", requestBody);

      // Kiểm tra phản hồi từ API
      if (response && response.metadata) {
        setLoading(false);
        message.success("Đăng ký thành công!"); // Hiển thị thông báo thành công
        console.log("Response from API:", response); // Xử lý phản hồi nếu cần
      } else {
        setLoading(false);
        message.error("Đăng ký thất bại, vui lòng thử lại."); // Hiển thị thông báo lỗi nếu không có metadata
      }
    } catch (error) {
      setLoading(false);
      message.error(`Đăng ký thất bại: ${error.message || error}`); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="text-2xl font-semibold mb-6 text-center">Đăng ký bán tài sản</div>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tên vật dụng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={itemName} // Liên kết với state
            onChange={(e) => setItemName(e.target.value)} // Cập nhật state khi nhập
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nhập tên vật dụng"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Số điện thoại (để liên hệ) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={phoneNumber} // Liên kết với state
            onChange={(e) => setPhoneNumber(e.target.value)} // Cập nhật state khi nhập
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Số lượng <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={quantity} // Liên kết với state
            onChange={(e) => setQuantity(e.target.value)} // Cập nhật state khi nhập
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nhập số lượng"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Giá tài sản <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={price} // Liên kết với state
            onChange={(e) => setPrice(e.target.value)} // Cập nhật state khi nhập
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nhập giá tài sản"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Ngày bắt đầu <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate} // Liên kết với state
            onChange={(e) => setStartDate(e.target.value)} // Cập nhật state khi chọn
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Ngày kết thúc <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={endDate} // Liên kết với state
            onChange={(e) => setEndDate(e.target.value)} // Cập nhật state khi chọn
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Loại tài sản</label>
          <select
            value={assetType} // Liên kết với state
            onChange={(e) => setAssetType(e.target.value)} // Cập nhật state khi chọn
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Chọn loại tài sản</option>
            <option value="Tài sản 1">Tài sản 1</option>
            <option value="Tài sản 2">Tài sản 2</option>
            <option value="Tài sản 3">Tài sản 3</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Mô tả</label>
          <textarea
            value={description} // Liên kết với state
            onChange={(e) => setDescription(e.target.value)} // Cập nhật state khi nhập
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Nhập mô tả về tài sản"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Chọn tệp</label>
          <input
            type="file"
            onChange={handleImageChange} // Gọi hàm khi có thay đổi
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {file && (
          <div className="flex justify-center">
            <img
              src={file} // Hiển thị ảnh đã tải lên
              alt="Uploaded"
              className="mt-4 w-32 h-32 object-cover rounded-lg" // Điều chỉnh kích thước và kiểu dáng
            />
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleRegister} // Gọi hàm handleRegister khi nhấn nút
            className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForAuction;
