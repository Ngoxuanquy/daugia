import Card from "@/app/components/card/card";
import React from "react";

// Định nghĩa kiểu dữ liệu cho arrayImg (nếu cần)

type Image = {
  id: number;
  img: string;
};

function HomePage() {
  const lists = [
    {
      id: 1,
      img: "avcxc",
      title: "Tổ chức bán đấu giá tài sản",
      describe:
        "Công ty Đấu giá Hợp danh Trường Sơn thực hiện hoạt động đấu giá truyền thống và hoạt động đấu giá trực tuyến trên nền tảng Đấu giá Trường Sơn.",
    },
    {
      id: 1,
      img: "avcxc",
      title: "Cho thuê nền tảng bán đấu giá trực tuyến tài sản",
      describe:
        "Sở hữu 10 chi nhánh trên cả nước và nền tảng đấu giá trực tuyến số 1 Việt Nam, chúng tôi cung cấp dịch vụ cho các tổ chức có chức năng, nhiệm vụ đấu giá thuê các cơ sở vật chất của mình để tổ chức các buổi đấu giá.",
    },
    {
      id: 1,
      img: "avcxc",
      title: "Hỗ trợ Hoạt động Đấu giá Tài sản",
      describe:
        "Với đội ngũ luật sư, đấu giá viên có nhiều năm kinh nghiệm, chúng tôi nhận tư vấn, hỗ trợ các vấn đề pháp lý liên quan đến Đấu giá tài sản bao gồm các trình tự, thủ tục trước, trong và sau khi phiên đấu giá kết thúc.",
    },
  ];

  const arrayImgs: Image[] = [
    {
      id: 1,
      img: "https://daugiatruongson.vn/packs/static/images/logos/logo-1-a573d84aeac59307dc5f.jpg",
    },
    {
      id: 2,
      img: "https://daugiatruongson.vn/packs/static/images/logos/logo-1-a573d84aeac59307dc5f.jpg",
    },
    {
      id: 3,
      img: "https://daugiatruongson.vn/packs/static/images/logos/logo-1-a573d84aeac59307dc5f.jpg",
    },
    {
      id: 4,
      img: "https://daugiatruongson.vn/packs/static/images/logos/logo-1-a573d84aeac59307dc5f.jpg",
    },
    {
      id: 5,
      img: "https://daugiatruongson.vn/packs/static/images/logos/logo-1-a573d84aeac59307dc5f.jpg",
    },
  ];

  return (
    <div>
      <div className="bg-[#EDEEEF] p-5 ">
        <div className="text-gray-800 mb-3">
          <div className="text-sm">Trang chủ / Giới thiệu</div>
        </div>
        <div className="flex flex-col justify-around md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-10 mb-6">
          {/* Cột 1 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">NỀN TẢNG ĐẤU GIÁ TRỰC TUYẾN</h1>
          </div>

          {/* Cột 2 */}
          <div className="flex-1 text-gray-700 mr-30">
            <p>
              Thuộc quyền sở hữu của <span className="font-bold">Công ty Đấu giá Hợp danh Trường Sơn</span>, đã được Sở Tư Pháp Hà Nội chính
              thức thông qua ngày 15/08/2023 và được Cục bản quyền tác giả - Bộ Văn hoá, Thể thao và Du lịch cấp Giấy chứng nhận đăng ký
              quyền tác giả theo Quyết định số 3449/2023/QTG ngày 28/04/2023. Mọi hoạt động trên nền tảng này hoàn toàn hợp pháp và tuân thủ
              quy định của pháp luật Nhà nước Xã hội Chủ nghĩa Việt Nam.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img className="w-full" src="https://daugiatruongson.vn/packs/static/images/about/banner-37e23d5013a7bb8b6e9f.jpg" />
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
          <h2 className="text-3xl font-bold mb-4">Kết nối với khách hàng mọi nơi trên thế giới</h2>
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

      <div className="flex justify-around items-center w-full">
        <h1 className="text-[30px] text-bold ">DỊCH VỤ CỦA CHÚNG TÔI</h1>
      </div>

      <div className="">
        <div>
          <Card lists={lists} />
        </div>
      </div>

      <div className="w-full mt-10 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-[30px] font-bold">ĐỐI TÁC CỦA CHÚNG TÔI</h1>
          <h5 className="w-[600px] mt-3 text-center">
            Công ty Đấu giá Hợp Danh Trường Sơn Top 20 những tổ chức đấu giá chuyên nghiệp, uy tín hàng đầu Việt Nam do Bộ Tư Pháp công nhận
            và được nhiều đối tác tin tưởng, hợp tác.
          </h5>
        </div>

        <div className="flex justify-around items-center w-full mt-6 flex-wrap gap-4">
          {arrayImgs.map((arrayImg: Image) => (
            <div key={arrayImg.id} className="w-50 h-40 m-10">
              <img src={arrayImg.img} alt={`Partner ${arrayImg.id}`} className="w-full h-full object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
