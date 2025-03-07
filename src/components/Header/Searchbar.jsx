import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null); // Added ref for dropdown

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

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    setIsDropDown(false);
  };

  return (
    <div className="flex w-4/6 h-10">
      <input
        className="w-3/5 border border-r-0 border-[#e8e8e8] rounded-tl-md rounded-bl-md outline-none placeholder:text-[#c5c3c3] px-2"
        type="text"
        placeholder="Search products"
      />
      <div
        ref={dropdownRef} // Attach ref to dropdown
        className="relative w-1/5 flex justify-center items-center gap-1 border border-[#e8e8e8] text-[#c5c3c3] cursor-pointer"
        onClick={handleDropDown}
        aria-expanded={isDropDown}
      >
        <span>All categories</span>
        <IoIosArrowDown
          className={`mt-1 transform transition-transform duration-300 ${isDropDown ? "rotate-180" : "rotate-0"}`}
        />
        {isDropDown && (
          <ul className="absolute top-[100%] left-0 bg-white text-black text-[14px] overflow-y-auto h-50 w-[200px] custom-scrollbar leading-10 z-10 shadow">
            {categories.map((item) => (
              <li key={item["_id"]} className="hover:bg-[#e8e8e8] px-3" onClick={() => handleCategorySelect(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="min-w-15 rounded-br-md rounded-tr-md bg-black text-white flex justify-center items-center cursor-pointer">
        <IoSearch className="text-2xl" />
      </button>
    </div>
  );
};

export default Searchbar;
