"use client";

import React, { useEffect, useState } from "react";
import CardAuction from "@/app/components/cardAuction/cardAuction";
import fetchApi from "@/app/utils/api"; // Your fetch utility
import { message } from "antd"; // Optional for error/success messages

const AuctionRoom = () => {
  const [listAuction, setListAuction] = useState([]); // State to hold auction data
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch auction data
  const fetchAuctionData = async () => {
    try {
      const response = await fetchApi("/room", "GET"); // Call your auction API endpoint
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

  // Use effect to fetch data on component mount
  useEffect(() => {
    fetchAuctionData();
  }, []);

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div>
      <div className="p-10">
        <div className="text-gray-800 mb-3">
          <div className="text-sm">Trang chủ / Phòng đấu giá</div>
        </div>
        <div>
          <h1 className="text-bold text-4xl mt-10 ">Phòng đấu giá</h1>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-3 gap-5 ">
        {/* Vòng lặp qua các item trong listAuction và truyền từng item vào CardAuction */}
        {listAuction.length > 0 ? (
          listAuction.map((auction, index) => 
          (
            <div style={{
             width: '500px'
            }}>
              <CardAuction key={index} auction={auction} />
              </div>
          )
          )
        ) : (
          <p className="text-center col-span-full">Không có tài sản nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionRoom;
