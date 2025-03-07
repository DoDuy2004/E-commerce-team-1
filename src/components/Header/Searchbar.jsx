import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { getCategories } from "../../services/categoryService";

const Searchbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const [searchCategory, setSearchCategory] = useState('');

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  // Xử lý click ngoài dropdown
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

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    setIsDropDown(false);
  };

  return (
    <div className="flex w-4/6 h-10">
      <input
        className="w-4/6 border border-r-0 border-[#e8e8e8] rounded-tl-md rounded-bl-md outline-none placeholder:text-[#c5c3c3] px-2"
        type="text"
        placeholder="Search products"
      />
      <div
        ref={dropdownRef}
        className="relative w-1/5 flex justify-center items-center gap-1 border border-[#e8e8e8] text-[#c5c3c3] cursor-pointer"
        onClick={handleDropDown}
        aria-expanded={isDropDown}
      >
        <span>All categories</span>
        <IoIosArrowDown
          className={`mt-1 transform transition-transform duration-300 ${
            isDropDown ? "rotate-180" : "rotate-0"
          }`}
        />
        {isDropDown && (
          <ul className="absolute top-full left-0 bg-white text-black text-[14px] overflow-y-auto max-h-40 w-[200px] custom-scrollbar leading-10 z-30 shadow">
            {categories.length > 0 ? (
              categories.map((item) => (
                <li
                  key={item["_id"]}
                  className="hover:bg-[#e8e8e8] px-3"
                  onClick={() => handleCategorySelect(item.name)}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-3 text-gray-400">No categories found</li>
            )}
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
