const AuctionResults = () => {
  const auctionData = [
    {
      assetName: "01 xe ô tô, BKS: 30K-999.99",
      assetCode: "MTS_2024_GDDB_O8VWMP1",
      time: "15:00 20/09/2024 - 15:15 20/09/2024",
      result: "Phiên đấu giá thành công",
      winningPrice: "464.000.000 VND",
      notes: "",
    },
    {
      assetName: "01 xe ô tô, BKS: 30K-14814",
      assetCode: "MTS_2024_GDDB_O8VWMP2",
      time: "15:00 20/09/2024 - 15:15 20/09/2024",
      result: "Phiên đấu giá thành công2",
      winningPrice: "464.000.000 VND",
      notes: "",
    },
    // Add more auction data here as needed
  ];

  return (
    <div className="p-6 overflow-x-auto  h-[100vh]">
      <div className="text-gray-800 mb-3">
        <div className="text-sm">Trang chủ / Kết quả đấu giá</div>
      </div>
      <div>
        <h1 className="text-bold text-4xl mt-10 mb-10">Kết quả đấu giá</h1>
      </div>
      <div className="p-4 w-full bg-[#ECECEC] mb-10">
        <div className="flex items-center space-x-4 w-full">
          <input className="border border-gray-300 p-2 rounded-md flex-grow" placeholder="Text input" />
          <input type="date" className="border border-gray-300 p-2 rounded-md flex-grow" placeholder="Chọn ngày bắt đầu" />
          <input type="date" className="border border-gray-300 p-2 rounded-md flex-grow" placeholder="Chọn ngày kết thúc" />
          <select className="border border-gray-300 p-3 rounded-md flex-grow">
            <option>Select option</option>
            <option>Select option</option>
            <option>Select option</option>
          </select>
          <button className="bg-customRed text-white p-3">Tìm kiếm</button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-[#5A5C66] text-white">
          <tr>
            <th className="px-4 py-2 border-b text-left ">Tên tài sản</th>
            <th className="px-4 py-2 border-b text-left ">Mã tài sản</th>
            <th className="px-4 py-2 border-b text-left ">Bắt đầu - Kết thúc</th>
            <th className="px-4 py-2 border-b text-left ">Kết quả</th>
            <th className="px-4 py-2 border-b text-left ">Giá trúng</th>
            <th className="px-4 py-2 border-b text-left ">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {auctionData.map((auction, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b px-4 py-2">{auction.assetName}</td>
              <td className="border-b px-4 py-2">{auction.assetCode}</td>
              <td className="border-b px-4 py-2">{auction.time}</td>
              <td className="border-b px-4 py-2">{auction.result}</td>
              <td className="border-b px-4 py-2">{auction.winningPrice}</td>
              <td className="border-b px-4 py-2">{auction.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionResults;
