import React from "react";

// Định nghĩa kiểu cho từng phần tử trong mảng lists
type ListItem = {
  id: number;
  img: string;
  title: string;
  describe: string;
};

// Định nghĩa kiểu cho props của component Card
type CardProps = {
  lists: ListItem[];
};

const Card: React.FC<CardProps> = ({ lists }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 mt-10  ">
      {lists.map((item) => (
        <div key={item.id} className="border p-4 rounded-md shadow-md w-[25%] h-[450px] flex flex-col justify-between">
          <div>
            <img src={item.img} alt={item.title} className="w-full h-32 object-cover mb-2 rounded-lg" />
            <h3 className="text-xl font-bold h-16 flex items-center justify-center text-center">{item.title}</h3>
          </div>
          <p className="flex-grow h-24 text-center">{item.describe}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
