import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="flex w-4/6 h-10">
      <input className="w-3/5 border border-r-0 border-[#e8e8e8] rounded-tl-md rounded-bl-md outline-none placeholder:text-[#c5c3c3] px-2" type="text" placeholder="Search products" />
      <div className="w-1/5 flex justify-center items-center gap-1 border border-[#e8e8e8] text-[#c5c3c3]"><span>All categories</span> <IoIosArrowDown className="mt-1" /></div>
      <button className="min-w-15 rounded-br-md rounded-tr-md bg-black text-white flex justify-center items-center">
        <IoSearch className="text-2xl" />
      </button>
    </div>
  );
};

export default Searchbar;
