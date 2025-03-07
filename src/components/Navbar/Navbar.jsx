import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    
  }, [])

  return (
    <div className="flex justify-between">
      <button className="uppercase flex items-center gap-2 cursor-pointer">
        <BiCategory /> Categories
      </button>
      <ul className="flex gap-8">
        <li className="cursor-pointer font-bold">Home</li>
        <li className="cursor-pointer">Today's Deals</li>
        <li className="cursor-pointer">Customer Services</li>
        <li className="cursor-pointer">Trending Products</li>
        <li className="cursor-pointer">Blog</li>
        <li className="cursor-pointer">Special Offers</li>
      </ul>
    </div>
  );
};

export default Navbar;
