import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/white-page" },
  { name: "Today's Deals", href: "/white-page" },
  { name: "Customer Services", href: "/white-page" },
  { name: "Trending Products", href: "/white-page" },
  { name: "Blog", href: "/white-page" },
  { name: "Special Offers", href: "/white-page" },
];

const Navbar = ({ categories }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isActive, setIsActive] = useState("Home");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const nav = useNavigate();

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetProductsByCategory = (categoryID) => {
    setIsDropDown(false);
    nav(`/products?categoryID=${categoryID}`);
  };

  return (
    <nav className="bg-white mt-20 ">
      <div className="min-w-full mx-auto hidden px-16 lg:block">
        <div className="flex items-center justify-between">
          <div className="relative w-[40%] py-4">
            <button
              className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 hover:text-gray-900"
              onClick={(e) => handleDropDown(e)}
              ref={buttonRef}
            >
              <BiCategory className="h-5 w-5" />
              CATEGORIES
            </button>
            {isDropDown && (
              <ul
                className="absolute w-[80%] rounded-sm shadow top-[100%] left-0 text-black z-50 bg-white grid grid-cols-3 gap-4 justify-center items-center"
                ref={dropdownRef}
              >
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="px-4 py-2 text-center hover:bg-gray-100"
                        onClick={() => handleGetProductsByCategory(item._id)}
                      >
                        {item.name}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>

          <ul className="flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={` ${
                    isActive === link.name ? "text-gray-900" : ""
                  }  font-semibold block py-4 text-gray-500 hover:text-gray-900`}
                  onClick={() => setIsActive((prev) => link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
