"use client";

import React, { useEffect, useState } from "react";
import fetchApi from "@/app/utils/api";
import { message } from "antd";
import Cookies from "js-cookie";

const AssetPortfolio = () => {
  const [listAuction, setListAuction] = useState([]); // State to hold auction data
  const [loading, setLoading] = useState(false);

  const fetchAuctionData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`/room/not-confirmed-useId/${Cookies.get("userId")}`, "GET"); // Call your auction API endpoint
      if (response && response.metadata) {
        setListAuction(response.metadata); // Update state with auction data
      } else {
        message.error("No auction data found."); // Show error message if no data
      }
    } catch (error) {
      message.error(`Error fetching auction data: ${error || error}`); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctionData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Auction List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Starting Price</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Start Date</th>
                  <th className="border border-gray-300 px-4 py-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {listAuction.length > 0 ? (
                  listAuction.map((auction) => (
                    <tr key={auction.id}>
                      <td className="border border-gray-300 px-4 py-2">{auction.title}</td>
                      <td className="border border-gray-300 px-4 py-2"><img src={auction.image} alt={auction.title} className="h-16" /></td>
                      <td className="border border-gray-300 px-4 py-2">{auction.startPrice}</td>
                      <td className="border border-gray-300 px-4 py-2 text-red-500">{auction.status}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatDate(auction.startDate)}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatDate(auction.endDate)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                      No auction data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetPortfolio;
