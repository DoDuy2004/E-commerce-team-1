import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const BannerItem = ({index, image, title, discount}) => {
  return (
    <div key={index} className="w-full flex-shrink-0 relative">
      <img
        className="h-[500px] w-full object-cover"
        src={image}
        alt={title}
      />
      <div className="absolute w-1/2 text-white top-[30%] left-[10%] flex flex-col gap-5">
        <h4 className="text-4xl w-full font-semibold">
          {title}
        </h4>
        <span className="block text-5xl"> {discount}</span>
        <button className="w-[30%] flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
          <FaCartShopping />
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
