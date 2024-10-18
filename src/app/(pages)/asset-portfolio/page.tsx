import React from "react";

const AssetPortfolio = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Asset Portfolio</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Stock 1</h2>
              <p>Value: $10,000</p>
              <p>Change: +5%</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Stock 2</h2>
              <p>Value: $7,500</p>
              <p>Change: +2%</p>
            </div>
            {/* Add more stocks as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetPortfolio;
