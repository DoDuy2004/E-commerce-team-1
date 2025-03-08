import React, { useEffect, useState, useRef, use } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";

const Searchbar = ({ categories }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchByProduct, setSearchByProduct] = useState("");
  const [searchByCategoryID, setSearchByCategoryID] = useState("");
  const dropdownRef = useRef(null);

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchProduct = async () => {
    const data = await getProducts(searchByProduct, searchByCategoryID);
    setProducts(data);
    // console.log(data);
  };

  const handleCategorySelect = (category, categoryID) => {
    setIsDropDown(false);
    setSelectedCategory((prev) => category);
    setSearchByCategoryID((prev) => categoryID);
  };

  // console.log(searchByProduct);

  return (
    <div className="order-3 mt-4 lg:order-2 lg:mt-0 lg:flex lg:w-[40%] xl:w-[50%]">
      <div className="relative flex w-full">
        <input
          type="text"
          placeholder="Search products"
          className="w-full rounded-l-md border border-r-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-0"
          onChange={(e) => setSearchByProduct(e.target.value)}
        />
        <div
          ref={dropdownRef}
          className="relative w-1/3 flex items-center justify-center border border-l-1 border-gray-300 bg-white px-4 text-gray-500"
          onClick={() => setIsDropDown(!isDropDown)}
        >
          <span className="w-full text-xs lg:text-base md:text-sm text-center">{selectedCategory}</span>
          <IoIosArrowDown
            className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
              isDropDown ? "rotate-180" : "rotate-0"
            }`}
          />
          {isDropDown && (
            <ul className="absolute top-full left-0 z-10 mt-1 w-full lg:w-50 rounded-md bg-white py-1 shadow ring-opacity-5">
              {categories && categories.length > 0 ? categories.map((category) => (
                <li
                  key={category._id}
                  className="px-4 py-2 text-xs lg:text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleCategorySelect(category.name, category._id)
                  }
                >
                  {category.name}
                </li>
              )) : <li className="px-4 py-2 text-xs lg:text-base text-gray-700">There are currently no product categories</li> }
            </ul>
          )}
        </div>
        <button
          onClick={handleSearchProduct}
          className="rounded-r-md bg-black px-4 py-2 text-white focus:outline-0"
        >
          <IoSearch className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
