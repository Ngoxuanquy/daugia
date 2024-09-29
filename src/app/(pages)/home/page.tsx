function HomePage() {
  return (
    <div>
      <div className="bg-[#EDEEEF] p-5 ">
        <div className="text-gray-800 mb-3">
          <div className="text-sm">Trang chủ / Giới thiệu</div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-10 mb-6">
          {/* Cột 1 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">NỀN TẢNG ĐẤU GIÁ TRỰC TUYẾN</h1>
          </div>

          {/* Cột 2 */}
          <div className="flex-1 text-gray-700 mr-30">
            <p>
              Thuộc quyền sở hữu của{" "}
              <span className="font-bold">
                Công ty Đấu giá Hợp danh Trường Sơn
              </span>
              , đã được Sở Tư Pháp Hà Nội chính thức thông qua ngày 15/08/2023
              và được Cục bản quyền tác giả - Bộ Văn hoá, Thể thao và Du lịch
              cấp Giấy chứng nhận đăng ký quyền tác giả theo Quyết định số
              3449/2023/QTG ngày 28/04/2023. Mọi hoạt động trên nền tảng này
              hoàn toàn hợp pháp và tuân thủ quy định của pháp luật Nhà nước Xã
              hội Chủ nghĩa Việt Nam.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-full"
          src="https://daugiatruongson.vn/packs/static/images/about/banner-37e23d5013a7bb8b6e9f.jpg"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center p-5 ">
        <div className="flex-1 mb-4 md:mb-0">
          <img
            src="https://daugiatruongson.vn/packs/static/images/about/connect-7c10c2808e5aed0ba683.jpg"
            alt="Kết nối"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex-1 text-gray-800 ml-10">
          <h2 className="text-3xl font-bold mb-4">
            Kết nối với khách hàng mọi nơi trên thế giới
          </h2>
          <div className="space-y-4">
            <div className="flex items-center text-lg hover:text-blue-500 transition duration-300">
              <span className="text-green-500 font-bold mr-2">✔️</span>
              <span>Không lo ngại về địa lý</span>
            </div>
            <div className="flex items-center text-lg hover:text-blue-500 transition duration-300">
              <span className="text-green-500 font-bold mr-2">✔️</span>
              <span>Đấu giá tài sản nhanh chóng</span>
            </div>
            <div className="flex items-center text-lg hover:text-blue-500 transition duration-300">
              <span className="text-green-500 font-bold mr-2">✔️</span>
              <span>Thông tin được bảo mật tuyệt đối</span>
            </div>
            <div className="flex items-center text-lg hover:text-blue-500 transition duration-300">
              <span className="text-green-500 font-bold mr-2">✔️</span>
              <span>Đảm bảo công bằng, tuân thủ pháp luật</span>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-around items-center w-full">
        <h1>DỊCH VỤ CỦA CHÚNG TÔI</h1>
      </div>
    </div>
  );
}

export default HomePage;
