import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";

const Banner = () => {
  const [ads, setAds] = useState([]);

  return (
    <div className="px-16 pt-5 h-[500px] relative">
      <img
        className="h-full w-full rounded-2xl"
        src="https://picsum.photos/800/400?random=2"
        alt=""
      />
      <div className="absolute text-white top-[30%] left-[10%]">
        <h4 className="text-4xl w-[300px] font-semibold leading-normal">
          New Year Sale Offer 2024 <span className="text-5xl">20% OFF</span>
        </h4>
        <button>
          <FaCartShopping /> Start Shopping
        </button>
      </div>
    </div>
  );
};

export default Banner;
