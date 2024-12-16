"use client";

import fetchApi from "@/app/utils/api";
import { message } from "antd";
import { useEffect, useState } from "react";

const AuctionResults = () => {
  const [listAuction, setListAuction] = useState([]); // State to hold auction data
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchText, setSearchText] = useState(""); // State for search input
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter

  // Function to fetch auction data
  const fetchAuctionData = async () => {
    try {
      const response = await fetchApi("/room/allRoomEnd", "GET"); // Call your auction API endpoint
      if (response && response.metadata) {
        setListAuction(response.metadata); // Update state with auction data
      } else {
        message.error("No auction data found."); // Show error message if no data
      }
    } catch (error) {
      message.error(`Error fetching auction data: ${error || error}`); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchAuctionData();
  }, []);

  // Filter the listAuction data based on search criteria
  const filteredAuctions = listAuction.filter((auction) => {
    // Check if searchText is included in title or roomCode
    const textMatch =
      auction.title.toLowerCase().includes(searchText.toLowerCase()) || auction.roomCode.toLowerCase().includes(searchText.toLowerCase());

    // Check if the auction falls within the selected date range
    const dateMatch =
      (!startDate || new Date(auction.startDate) >= new Date(startDate)) && (!endDate || new Date(auction.endDate) <= new Date(endDate));

    // Check if the auction status matches the selected status
    const statusMatch = !statusFilter || auction.status === statusFilter;

    return textMatch && dateMatch && statusMatch;
  });
  
  console.log(listAuction)

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div className="p-6 overflow-x-auto h-[100vh]">
      <div className="text-gray-800 mb-3">
        <div className="text-sm">Trang chủ / Kết quả đấu giá</div>
      </div>
      <div>
        <h1 className="text-bold text-4xl mt-10 mb-10">Kết quả đấu giá</h1>
      </div>
      <div className="p-4 w-full bg-[#ECECEC] mb-10">
        <div className="flex items-center space-x-4 w-full">
          <input
            className="border border-gray-300 p-2 rounded-md flex-grow"
            placeholder="Text input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update searchText state
          />
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md flex-grow"
            placeholder="Chọn ngày bắt đầu"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} // Update startDate state
          />
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md flex-grow"
            placeholder="Chọn ngày kết thúc"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)} // Update endDate state
          />
          <select
            className="border border-gray-300 p-3 rounded-md flex-grow"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)} // Update statusFilter state
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="bg-customRed text-white p-3" onClick={fetchAuctionData}>
            Tìm kiếm
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-[#5A5C66] text-white">
          <tr>
            <th className="px-4 py-3 border-b text-left font-semibold">Tên tài sản</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Mã tài sản</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Bắt đầu - Kết thúc</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Người trúng</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Kết quả</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Giá trúng</th>
            <th className="px-4 py-3 border-b text-left font-semibold">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {filteredAuctions.map((auction, index) => (
            <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="border-b px-4 py-2">{auction.title}</td>
              <td className="border-b px-4 py-2">{auction.roomCode}</td>
              <td className="border-b px-4 py-2">
                {new Date(auction.startDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(auction.endDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="border-b px-4 py-2">{auction.highestBidder}</td>
              <td class="bg-green-500 text-white text-sm text-center rounded-lg w-32 h-9 mt-1 flex items-center justify-center">
                {auction.bidHistory.length === 0 ? 'Đấu giá không thành' : auction.status}
              </td>

              <td className="border-b px-4 py-2">{auction.currentPrice} VNĐ</td>
              <td className="border-b px-4 py-2">{auction.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionResults;
