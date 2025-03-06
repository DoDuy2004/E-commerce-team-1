import React from "react";
import { BiCategory } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <button className="uppercase flex items-center gap-2">
        <BiCategory /> Categories
      </button>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>Today's Deals</li>
        <li>Customer Services</li>
        <li>Trending Products</li>
        <li>Blog</li>
        <li>Special Offers</li>
      </ul>
    </div>
  );
};

export default Navbar;
