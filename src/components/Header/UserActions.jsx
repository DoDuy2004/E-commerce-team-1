import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const UserActions = () => {
  return (
    <div className="hidden lg:order-3 lg:flex lg:items-center lg:space-x-6">
      <Link
        to="/register"
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <FaRegUser className="h-6 w-6" />
        <div className="ml-2">
          <p className="text-xs text-gray-500">Sign in</p>
          <p className="text-sm font-medium">Account</p>
        </div>
      </Link>
      <Link to="/white-page" className="text-gray-700 hover:text-gray-900">
        <RiMailSendLine className="h-6 w-6" />
      </Link>
      <Link
        to="/white-page"
        className="relative text-gray-700 hover:text-gray-900"
      >
        <FaRegHeart className="h-6 w-6" />
        <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          0
        </span>
      </Link>
      <Link
        to="/white-page"
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <div className="relative">
          <LuShoppingCart className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            0
          </span>
        </div>
        <div className="ml-2">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-sm font-medium">$0.00</p>
        </div>
      </Link>
    </div>
  );
};

export default UserActions
