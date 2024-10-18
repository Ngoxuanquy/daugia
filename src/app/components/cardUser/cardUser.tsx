import { UserOutlined, BellOutlined, ShoppingCartOutlined, LoginOutlined, RadarChartOutlined } from "@ant-design/icons";

const CardUser = ({ onItemClick, activeColor }) => {
  const name = "Trần Đại Hùng";

  const handleClick = (label) => {
    if (onItemClick) {
      onItemClick(label);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto mt-10 mb-10">
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://demoda.vn/wp-content/uploads/2022/03/hinh-nen-cute-mau-xanh-duong.jpg"
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover mr-4 mb-2"
        />
        <div>
          <label className="text-lg font-semibold">{name}</label>
          <div className="text-white bg-red-500 w-[120px] text-center items-center p-1 rounded mt-1">Thành viên</div>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="space-y-2">
        <div
          className={`h-[40px] flex items-center ${
            activeColor === "Thông tin tài khoản" ? "text-red-500" : "text-gray-900"
          } hover:text-red-500 cursor-pointer`}
          onClick={() => handleClick("Thông tin tài khoản")}
        >
          <UserOutlined className="mr-2" />
          <label>Thông tin tài khoản</label>
        </div>
        <div
          className={`h-[40px] flex items-center ${
            activeColor === "Thông báo" ? "text-red-500" : "text-gray-700"
          } hover:text-red-500 cursor-pointer`}
          onClick={() => handleClick("Thông báo")}
        >
          <BellOutlined className="mr-2" />
          <label>Thông báo</label>
        </div>
        <div
          className={`h-[40px] flex items-center ${
            activeColor === "Giỏ hàng" ? "text-red-500" : "text-gray-700"
          } hover:text-red-500 cursor-pointer`}
          onClick={() => handleClick("Giỏ hàng")}
        >
          <ShoppingCartOutlined className="mr-2" />
          <label>Giỏ hàng</label>
        </div>
        <div
          className={`h-[40px] flex items-center ${
            activeColor === "Phòng đấu giá của tôi" ? "text-red-500" : "text-gray-700"
          } hover:text-red-500 cursor-pointer`}
          onClick={() => handleClick("Phòng đấu giá của tôi")}
        >
          <RadarChartOutlined className="mr-2" />
          <label>Phòng đấu giá của tôi</label>
        </div>
        <div
          className={`h-[40px] flex items-center ${
            activeColor === "Đăng xuất" ? "text-red-500" : "text-gray-700"
          } hover:text-red-500 cursor-pointer`}
          onClick={() => handleClick("Đăng xuất")}
        >
          <LoginOutlined className="mr-2" />
          <label>Đăng xuất</label>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
