"use client";

import { useLoading } from "@/app/layout";
import fetchApi from "@/app/utils/api";
import { Button, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const DetailAuction = () => {
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

      // const highestBid = bidHistory?.reduce((maxBid, currentBid) => {
      //   return currentBid.bidAmount > maxBid.bidAmount ? currentBid : maxBid;
      // }, bidHistory[0]);

      // const uidOfHighestBid = highestBid?.uid;

      // if (remainingEndTime === "Đã kết thúc") {
      //   fetchApi("/room/send-email-auction-successful", "POST", { uidOfHighestBid: uidOfHighestBid, auction });
      // }
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
      // window.location.href = "/auction-room";
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
          {/* Chi tiết đấu giá */}
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

            {/* Hiển thị thời gian còn lại */}
          </div>

          {/* Đấu giá và Lịch sử đấu giá */}
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
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Đấu giá</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Số tiền đấu giá</label>
              <input
                type="text"
                value={bidAmount}
                onChange={handleBidChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                placeholder="Nhập số tiền bạn muốn đấu giá"
                disabled={
                  remainingStartTime !== "" ||
                  remainingEndTime === "Đã kết thúc" ||
                  auction.user == Cookies.get("userId") ||
                  Cookies.get("userId") == null
                } // Không cho phép đấu giá nếu chưa bắt đầu
              />
              <button
                onClick={handleBid}
                className={`mt-4 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 ${
                  remainingStartTime !== "" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={
                  remainingStartTime !== "" ||
                  remainingEndTime === "Đã kết thúc" ||
                  auction.user == Cookies.get("userId") ||
                  bidAmount == "" ||
                  Cookies.get("userId") == null
                }
              >
                Đặt giá
              </button>
              {/* <CustomButton
                onClick={handleBid}
                className={`mt-4 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 ${
                  remainingStartTime !== "" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={
                  remainingStartTime !== "" ||
                  remainingEndTime === "Đã kết thúc" ||
                  auction.user == Cookies.get("userId") ||
                  bidAmount === "" ||
                  Cookies.get("userId") == null
                }
              >
                Đặt giá thầu
              </CustomButton> */}
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Lịch sử đấu giá</h2>
            <div className="space-y-4">
              {bidHistory.length ? (
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-300 p-4 text-left text-lg font-semibold text-gray-700">Mã user</th>
                      <th className="border-b border-gray-300 p-4 text-left text-lg font-semibold text-gray-700">Số tiền</th>
                      <th className="border-b border-gray-300 p-4 text-left text-lg font-semibold text-gray-700">Ngày</th>
                      <th className="border-b border-gray-300 p-4 text-left text-lg font-semibold text-gray-700">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidHistory
                      ?.slice()
                      .reverse()
                      .map((bid, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-100 transition duration-200 ${
                            bid.bidAmount !== auction.currentPrice ? "line-through text-red-500" : ""
                          }`}
                        >
                          <td className="border-b border-gray-300 p-4 text-[14px] font-semibold text-gray-700">M-{bid.uid?.slice(-6)}</td>
                          <td className="border-b border-gray-300 p-4 text-[14px] font-semibold text-gray-700">
                            {bid.bidAmount.toLocaleString("vi-VN")} VNĐ
                          </td>
                          <td className="border-b border-gray-300 p-4 text-[14px] font-semibold text-gray-700">
                            {new Date(bid.time).toLocaleDateString()}
                          </td>
                          <td className="border-b border-gray-300 p-4 text-[14px] font-semibold text-gray-700">
                            {bid.bidAmount !== auction.currentPrice ? (
                              <span className="text-[red]">Đã có người trả giá cao hơn</span>
                            ) : (
                              <span className="text-[green]">Giá cao nhất</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-lg">Chưa có lịch sử đấu giá.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default DetailAuction;
