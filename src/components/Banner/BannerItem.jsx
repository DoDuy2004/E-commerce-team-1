import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const BannerItem = ({index, image, title, discount}) => {
  return (
    <div key={index} className="w-full flex-shrink-0 relative">
      <img
        className="h-[500px] w-full object-cover"
        src={image}
        alt={title || "Advertisement"}
      />
      <div className="absolute text-white top-[30%] left-[10%]">
        <h4 className="text-4xl w-[300px] font-semibold leading-normal">
          {title || "New Year Sale Offer 2024"}
          <span className="text-5xl"> {discount || "20% OFF"}</span>
        </h4>
        <button className="mt-4 flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">
          <FaCartShopping />
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
