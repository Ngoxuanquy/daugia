"use client";
import fetchApi from "@/app/utils/api";
import { useState } from "react";
import { Button, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useLoading } from "@/app/layout";
import { Input } from "antd";
const Signup = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { setLoading } = useLoading();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    fullName: "",
    birthDate: "",
    gender: "",
    email: "",
    address: "",
    idNumber: "",
    idIssueDate: "",
    idIssuePlace: "",
    bankAccountNumber: "",
    bankName: "",
    bankAccountHolder: "",
    agree1: false,
    agree2: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async () => {
    try {
      const requiredFields = [
        "phoneNumber",
        "password",
        "fullName",
        "birthDate",
        "email",
        "agree1", // Giả sử agree1 là bắt buộc
        "agree2", // Giả sử agree2 là bắt buộc
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          messageApi.open({
            type: "error",
            content: `${field} is required.`,
          });

          return; // Dừng hàm nếu có trường bắt buộc bị trống
        }
      }
      setLoading(true);

      const response = await fetchApi("/auth/signup", "POST", formData);
      if (response.metadata.message === "Vui lòng kiểm tra email của bạn để xác nhận.") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    } catch (error) {
      setLoading(false);

      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  };

  const [otp, setOtp] = useState("");
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    // Xử lý OTP ở đây, ví dụ: gửi đến server
    setLoading(true);

    // onClose(); // Đóng modal sau khi xử lý
    const response = await fetchApi("/auth/verify-email", "POST", { code: otp, email: formData.email });

    Cookies.set("fullName", formData.fullName, { expires: 7 }); // Hết hạn sau 7 ngày
    // Cookies.set("token", response.metadata.tokens.accessToken, { expires: 7 });
    setLoading(false);
    close();
    messageApi.open({
      type: "success",
      content: `Signup successful:`,
    });
    router.push("/");
    console.log("Signup successful:", response);
  };

  const handleChangeVerifyEmail = (value) => {
    setOtp(value.toUpperCase()); // Cập nhật giá trị OTP
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md bg-[white] mt-10">
      {contextHolder}
      <Modal
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Gửi
          </Button>,
        ]}
        style={{
          width: "500px",
          height: "500px",
        }}
      >
        <div className="flex flex-col items-center h-[300px]">
          <h2 className="text-2xl font-bold mb-4 mt-0">Nhập mã OTP của bạn</h2>
          <div className="flex-grow flex items-center justify-center">
            {" "}
            {/* Để căn giữa input */}
            <Input.OTP
              className="w-full max-w-xs p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 mt-2" // Thêm mt-2 để tạo khoảng cách trên
              value={otp}
              onChange={handleChangeVerifyEmail} // Chuyển đổi thành chữ hoa
            />
          </div>
        </div>
      </Modal>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-customRed uppercase">Đăng ký tài khoản</h1>
      </div>

      <div className="mb-4">
        <div className="text-sm font-bold uppercase text-gray-600">THÔNG TIN TÀI KHOẢN</div>
        <div className="grid grid-cols-1 gap-4 mt-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-600 mb-4">THÔNG TIN NGƯỜI DÙNG</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày tháng năm sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mt-1">
              <input type="radio" name="gender" value="male" onChange={handleChange} className="mr-2" /> Nam
              <input type="radio" name="gender" value="female" onChange={handleChange} className="ml-6 mr-2" /> Nữ
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ thường trú <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số CMND/CCCD/ Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày cấp CMND/CCCD/ Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="idIssueDate"
              value={formData.idIssueDate}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nơi cấp CMND/CCCD/ Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              name="idIssuePlace"
              value={formData.idIssuePlace}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số tài khoản ngân hàng <span className="text-red-500">*</span>
            </label>
            <input
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên ngân hàng <span className="text-red-500">*</span>
            </label>
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên chủ tài khoản ngân hàng <span className="text-red-500">*</span>
            </label>
            <input
              name="bankAccountHolder"
              value={formData.bankAccountHolder}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-start mb-4">
            <input type="checkbox" name="agree1" checked={formData.agree1} onChange={handleChange} className="mr-2 mt-1" />
            <label className="text-sm">Tôi cam kết và chịu trách nhiệm trước pháp luật về thông tin đã cung cấp</label>
          </div>

          <div className="flex items-start mb-4">
            <input type="checkbox" name="agree2" checked={formData.agree2} onChange={handleChange} className="mr-2 mt-1" />
            <label className="text-sm">Tôi cam kết tuân thủ Quy định tham gia đấu giá trực tuyến tại website đấu giá trực tuyến</label>
          </div>
        </div>

        <button onClick={handleSignup} className="bg-customRed p-5 text-white">
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Signup;
