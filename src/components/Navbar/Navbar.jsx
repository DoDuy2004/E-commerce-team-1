import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { getCategories } from "../../services/categoryService";

const pages = [
  {
    title: "Home",
    active: false,
  },
  {
    title: "Today's Deals",
    active: false,
  },
  {
    title: "Customer Services",
    active: false,
  },
  {
    title: "Trending Products",
    active: false,
  },
  {
    title: "Blog",
    active: false,
  },
  {
    title: "Special Offers",
    active: false,
  },
];

console.log(pages);

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isActive, setIsActive] = useState(true);
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
      console.log(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-between relative mt-[5%]">
      <button
        className="uppercase flex items-center gap-2 cursor-pointer"
        ref={dropdownRef}
        onClick={handleDropDown}
      >
        <BiCategory /> Categories
        {isDropDown && (
          <ul
            className="absolute top-[150%] left-0 bg-white text-black text-[14px] overflow-y-auto max-h-100 min-w-max max-w-[800px] custom-scrollbar leading-5 z-10 shadow-md 
      grid grid-cols-4 gap-1 p-2 normal-case text-start"
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
        {pages &&
          pages.map((item, index) => (
              <li
                key={index}
              className={`cursor-pointer ${item.active && "font-bold"}`}
              >
                {item.title}
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default Navbar;
