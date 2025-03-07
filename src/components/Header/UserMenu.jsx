import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const UserMenu = () => {
  return (
    <div className="flex w-2/6 gap-12 justify-end items-center">
      <div className="flex items-center gap-2 cursor-pointer">
        <FaRegUser className="text-2xl" />
        <div className="flex flex-col gap-0">
          <span className="text-[10px] text-[#8a8888]">Sign in</span>
          <h4 className="text-[15px] font-bold">Account</h4>
        </div>
      </div>
      <div>
        <RiMailSendLine className="text-2xl cursor-pointer" />
      </div>
      <div>
        <FaRegHeart className="text-2xl cursor-pointer" />
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <LuShoppingCart className="text-2xl" />
        <div className="relative flex flex-col gap-0">
          <span className="text-[10px] text-[#8a8888]">Total</span>
          <h4 className="text-[15px] font-bold">$0.00</h4>
          <span className="absolute right-[100%] w-4 h-4 bg-[#e52947] text-[10px] text-white font-semibold rounded-full flex justify-center items-center">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
