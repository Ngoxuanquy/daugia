const Footer = () => {
  return (
    <div
      className="bg-cover bg-center py-10"
      style={{ backgroundImage: "url(https://daugiatruongson.vn/packs/static/images/footer/bg-footer-036a30ec185bfd6cd733.jpg)" }}
    >
      <div className="container mx-auto px-1">
        {/* Footer Table */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Công ty đấu giá hợp danh Trường Sơn</h3>
            <div className="flex justify-between">
              <p className="text-sm">Trụ sở chính</p>
              <p className="text-sm">Lô 3, khu A1-A2-A3 phường Cự Khối, quận Long Biên, thành phố Hà Nội</p>
            </div>
            <div className="flex mt-4 ">
              <p className="text-sm"> Hotline </p>
              <p className="text-sm ml-2"> 0522 169 888</p>
            </div>
            <div className="flex mt-4 ">
              <p className="text-sm"> Email </p>
              <p className="text-sm ml-2"> daugiatruongson@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Thông tin chung</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Lịch đấu giá
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Thông báo đấu giá
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Kết quả đấu giá
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Danh mục tài sản</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tài sản là đồ cổ, đá quý
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tài sản bảo đảm của Tổ chức Tín dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tài sản của cá nhân, tổ chức khác
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tài sản công - Tài sản nhà nước
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Tài sản Thi hành án
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Quy định về đấu giá trực tuyến
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Hướng dẫn đấu giá biển số xe
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Hướng dẫn tham gia đấu giá
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  Văn bản pháp luật
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-column ">
          <div className="mb-6 md:mb-0">
            <img
              src="https://daugiatruongson.vn/packs/static/images/footer/authenticate-2af7a2f345318ee803e9.png"
              alt="Authenticate"
              className="w-64"
            />
          </div>
          <div className="text-center md:text-left mt-5">
            <p className="text-sm">Giấy đăng ký hoạt động số: 21/TP-ĐKHĐ do Sở tư pháp Thành phố Hà Nội cấp ngày 30/07/2018</p>
            <p className="text-sm mt-6">
              Bản quyền trang web đấu giá trực tuyến daugiatruongson.vn thuộc quyền sở hữu của Công ty Đấu giá Hợp danh Trường Sơn, được Bộ
              Tư Pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 584/QĐ-STP ngày
              15/08/2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
