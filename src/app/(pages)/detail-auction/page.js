"use client";

import { useLoading } from "@/app/layout";
import fetchApi from "@/app/utils/api";
import { Button, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";

// Suspense component to handle waiting for data
const DetailAuctionContent = () => {
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();
  const id = searchParams.get("id");
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [remainingStartTime, setRemainingStartTime] = useState("");
  const [remainingEndTime, setRemainingEndTime] = useState("");

  const fetchAuctionData = async () => {
    try {
      const response = await fetchApi(`/room/detail-room/${id}`, "GET");
      if (response && response.metadata) {
        setAuction(response.metadata);
        setBidHistory(response.metadata.bidHistory || []);
      } else {
        message.error("Không tìm thấy dữ liệu đấu giá.");
      }
    } catch (error) {
      message.error(`Lỗi khi lấy dữ liệu: ${error || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async () => {
    // Chắc chắn auction.currentPrice là một chuỗi
    const cleanedCurrentPrice = String(auction.currentPrice).replace(/\./g, ""); // Bỏ dấu chấm

    const cleanedBidAmount = bidAmount.replace(/\./g, ""); // Bỏ dấu chấm trong bidAmount

    if (!cleanedBidAmount || isNaN(cleanedBidAmount) || Number(cleanedBidAmount) <= Number(cleanedCurrentPrice)) {
      message.error("Vui lòng nhập số tiền đấu giá hợp lệ cao hơn giá khởi điểm.");
      return;
    }
    const userResponse = await fetchApi(`/auth/getUser/${Cookies.get("userId")}`, "GET");
    if (userResponse && userResponse.metadata) {
      const userMoneys = userResponse.metadata.moneys;

      if (userMoneys < 10000) {
        message.error("Số dư của bạn không đủ để tham gia đấu giá. Bạn cần ít nhất 10,000.");
        return;
      }
    } else {
      message.error("Không thể lấy thông tin người dùng.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetchApi(`/room/auction`, "POST", { uid: Cookies.get("userId"), roomId: id, bidAmount });
      if (response && response.metadata) {
        message.success("Đấu giá thành công!");
        setBidHistory([...bidHistory, { bidAmount, date: new Date() }]);
        await fetchApi(`/auth/deduct-money/${Cookies.get("userId")}`, "GET");
        fetchAuctionData();
      } else {
        message.error("Đấu giá thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error(`Lỗi đấu giá: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thời gian còn lại
  const updateRemainingTime = () => {
    const now = new Date();
    const startDate = new Date(auction.startDate);
    const endDate = new Date(auction.endDate);

    // Thiết lập startDate chỉ đến nửa đêm (00:00:00)
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Thời gian còn lại cho đến khi bắt đầu
    if (startDate > now) {
      const diffTime = startDate - now;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setRemainingStartTime(`${diffDays} ngày, ${diffHours} giờ, ${diffMinutes} phút, ${diffSeconds} giây đến khi bắt đầu`);
      setRemainingEndTime(""); // Reset thời gian kết thúc nếu chưa bắt đầu
      return;
    }

    // Thời gian còn lại cho đến khi kết thúc
    if (endDate < now) {
      setRemainingEndTime("Đã kết thúc"); // Nếu đấu giá đã kết thúc
      return;
    }

    const diffTime = endDate - now;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    setRemainingEndTime(`${diffDays} ngày, ${diffHours} giờ, ${diffMinutes} phút, ${diffSeconds} giây còn lại`);
    setRemainingStartTime(""); // Reset thời gian bắt đầu nếu đã bắt đầu
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchAuctionData();
    }
  }, [id]);

  useEffect(() => {
    // Nếu có đấu giá, bắt đầu cập nhật thời gian
    if (auction) {
      updateRemainingTime(); // Lần đầu tiên
      const interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);

      return () => clearInterval(interval); // Dọn dẹp khi component bị hủy
    }
  }, [auction]);

  const handleBidChange = (e) => {
    let value = e.target.value;

    // Xóa tất cả dấu chấm để xử lý đúng
    const rawValue = value.replace(/\./g, "");

    // Chỉ cho phép nhập số
    if (/^[0-9]*$/.test(rawValue)) {
      // Định dạng giá trị thành VNĐ nếu có giá trị
      const formattedValue = rawValue ? Number(rawValue).toLocaleString("vi-VN") : "";
      setBidAmount(formattedValue);
    } else {
      // Nếu giá trị không hợp lệ, không thay đổi gì
      setBidAmount(value);
    }
  };

  const handleAuctionEnd = async () => {
    try {
      // Gửi request đến API kết thúc phiên đấu giá
      const response = await fetchApi(`/room/auction-end`, "POST", { roomId: id });

      // Nếu request thành công, hiển thị thông báo thành công
      message.success(response.metadata);
    } catch (error) {
      // Xử lý lỗi, hiển thị thông báo lỗi nếu request không thành công
      message.error("Kết thúc phiên đấu giá thất bại. Vui lòng thử lại.");
      console.error("Error ending auction:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {auction ? (
        <>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Chi tiết đấu giá</h1>
            {auction.image && (
              <div className="mt-4">
                <strong className="text-lg">Hình ảnh:</strong>
                <img src={auction.image} alt={auction.title} className="w-full h-auto mt-2 rounded-lg shadow-md" />
              </div>
            )}
            <p className="text-xl text-gray-600">
              <strong>Tiêu đề:</strong> <span className="text-[16px]">{auction.title}</span>
            </p>
            <p className="text-xl text-gray-600">
              <strong>Giá khởi điểm:</strong>{" "}
              <span className="text-[16px]">{auction.startPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} </span>
            </p>
            <p className="text-xl text-gray-600">
              <strong>Giá cao nhất:</strong>{" "}
              <span className="text-[16px]">{auction.currentPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} </span>
            </p>

            <p className="text-xl text-gray-600">
              <strong>Ngày bắt đầu:</strong> <span className="text-[16px]">{new Date(auction.startDate).toLocaleDateString()}</span>
            </p>
            <p className="text-xl text-gray-600">
              <strong>Ngày kết thúc:</strong> <span className="text-[16px]">{new Date(auction.endDate).toLocaleDateString()}</span>
            </p>
            <p className="text-xl text-gray-600">
              <strong>Mô tả:</strong> <span className="text-[16px]">{auction.description}</span>
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">
              {remainingStartTime && (
                <span>
                  <strong>Thời gian bắt đầu:</strong> <span className="text-red-500 text-red-600  text-[14px]">{remainingStartTime}</span>
                </span>
              )}
              {remainingEndTime && (
                <span>
                  <strong>Thời gian còn lại:</strong>
                  <span className="text-red-500 text-[14px] text-red-600  ml-[4px]">{remainingEndTime}</span>

                  {auction.user == Cookies.get("userId") && auction.status === "Đang diễn ra" && remainingEndTime === "Đã kết thúc" ? (
                    <Button
                      style={{
                        marginLeft: "10px",
                      }}
                      onClick={() => handleAuctionEnd()}
                    >
                      Kết thúc phiên đấu giá
                    </Button>
                  ) : null}
                </span>
              )}
            </p>
            {auction.status === "Đang diễn ra" && (
              <div>
                <input
                  className="p-2 border border-gray-300 rounded-lg w-full mt-2"
                  type="text"
                  placeholder="Nhập số tiền đấu giá"
                  value={bidAmount}
                  onChange={handleBidChange}
                />
                <Button
                  type="primary"
                  className="w-full mt-2"
                  onClick={handleBid}
                  disabled={remainingEndTime === "Đã kết thúc"}
                >
                  Đấu giá
                </Button>
              </div>
            )}
          </div>

          {/* Hiển thị lịch sử đấu giá */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Lịch sử đấu giá</h2>
            <ul className="space-y-4">
              {bidHistory.map((history, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <span className="font-semibold">Mức giá:</span>
                    <span className="text-green-600">{history.bidAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <strong>Thời gian:</strong> {new Date(history.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <span className="text-xl text-gray-500">Đang tải dữ liệu...</span>
        </div>
      )}
    </div>
  );
};

// Wrap the main content inside Suspense
const DetailAuctionPage = () => (
  <Suspense fallback={<div>Loading auction details...</div>}>
    <DetailAuctionContent />
  </Suspense>
);

export default DetailAuctionPage;
