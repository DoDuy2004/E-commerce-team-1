import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { getCategories } from "../../services/categoryService";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      // console.log(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-between">
      <button
        className="relative uppercase flex items-center gap-2 cursor-pointer"
        ref={dropdownRef}
        onClick={handleDropDown}
      >
        <BiCategory /> Categories
        {isDropDown && (
          <ul
            className="absolute top-[150%] left-0 bg-white text-black text-[14px] overflow-y-auto max-h-100 w-[800px] custom-scrollbar leading-10 z-10 shadow-md 
                grid grid-cols-4 gap-2 p-2 normal-case text-start"
          >
            {categories.length > 0 ? (
              categories.map((item) => (
                <li
                  key={item["_id"]}
                  className="hover:bg-[#e8e8e8] px-3 py-1"
                  onClick={() => handleCategorySelect(item.name)}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-3 text-gray-400 col-span-4">
                No categories found
              </li>
            )}
          </ul>
        )}
      </button>
      <ul className="flex gap-10">
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
