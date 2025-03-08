import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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

  return (
    <nav className="bg-white mt-20 ">
      <div className="min-w-full mx-auto hidden px-16 lg:block">
        <div className="flex items-center justify-between">
          <div className="relative py-4">
            <button className="flex items-center gap-2 font-bold text-gray-700 hover:text-gray-900">
              <BiCategory className="h-5 w-5" />
              CATEGORIES
            </button>
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
