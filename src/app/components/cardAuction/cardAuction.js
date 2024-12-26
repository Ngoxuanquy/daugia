import Link from "next/link";
import React from "react";

const CardAuction = ({ auction }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <div className="w-[430px] p-4 ml-[20px]">
      <Link href={{ pathname: "/detail-auction", query: { id: auction._id } }}>
        <div key={auction._id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          {auction.image && (
            <img
              src={auction.image} // Hiển thị ảnh từ chuỗi Base64
              alt={auction.itemName}
              className="w-full h-[300px] object-cover rounded-lg mb-4" // Điều chỉnh kích thước và kiểu dáng
            />
          )}
          <h2 className="text-xl font-bold text-blue-600 mb-2">{auction.title}</h2>

          <p className="text-gray-700 mb-1">
            Giá khởi điểm: <span className="font-semibold">{auction.startPrice} VNĐ</span>
          </p>
          <p className="text-gray-700 mb-1">
            Ngày bắt đầu: <span className="font-semibold">{formatDate(auction.startDate)}</span>
          </p>
          <p className="text-gray-700 mb-1">
            Ngày kết thúc: <span className="font-semibold">{formatDate(auction.endDate)}</span>
          </p>
          <p className="text-gray-700 mb-4 truncate w-full">Mô tả: {auction.description}</p>

          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Tham gia đấu giá
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardAuction;
