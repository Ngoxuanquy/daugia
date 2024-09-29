const Header = () => {
  return (
    <div className="w-full">
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
            <div className="cursor-pointer">Đăng ký bán tài sản</div>
            <div className="cursor-pointer">
              <span className="text-xs font-bold">Đăng Nhập</span>
            </div>
            <div className="cursor-pointer">
              <span className="text-xs font-bold">Đăng ký</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center m-4">
        <div className="font-bold">Logo</div> {/* Thêm lớp font-bold */}
        <div className="flex space-x-8 items-center">
          <div className="font-bold">Giới thiệu</div> {/* Thêm lớp font-bold */}
          <div className="font-bold">ĐG quyền sử dụng đất</div>{" "}
          <div className="font-bold">Danh mục tài sản</div>{" "}
          <div className="font-bold">Thông báo đấu giá</div>{" "}
          <div className="font-bold">Kết quả đấu giá</div>{" "}
          <div
            className="p-3.5 rounded-lg font-bold" // Thêm lớp font-bold
            style={{
              background: "linear-gradient(90deg, #c90000, #ff4848)",
              color: "white",
            }}
          >
            Phòng đấu giá của tôi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
