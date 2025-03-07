import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const nav = useNavigate();

  return (
    <div
      class="group relative"
      onClick={() => {
        nav(`/product-detail/${product.id}`);
      }}
    >
      <div className="relative w-full h-80 bg-gray-100 rounded-lg shadow-md flex items-center justify-center object-cover hover:scale-95 hover:brightness-90 overflow-hidden">
        <button
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer"
          onClick={(e) => {
            setLiked(!liked);
            e.stopPropagation();
          }}
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl transition" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl transition" />
          )}
        </button>
        <img
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          class="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80 cursor-pointer"
        />
      </div>

      <div class="mt-1 flex justify-between">
        <div>
          <h3 class="text-base text-gray-700 font-bold size-3 w-fit h-fit">
            <a>
              <span class=" inset-0"></span>
              {product.name}
            </a>
          </h3>
          <p class="mt-0 text-sm text-gray-500">{product.brand}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-0 space-x-2">
        <div className="flex items-start flex-col space-x-2 mt-2 text-sm">
          <div className="flex items-center justify-between text-orange-500">
            <FaStar size={16} fill="currentColor" />
            <span className="ml-1 font-medium text-gray-700">
              {product.rating} |
            </span>
            <div className="ml-2 px-1 py-0.5 bg-gray-200 rounded text-xs font-medium text-gray-700">
              {product.sold} Sold
            </div>
          </div>

          <div>
            <span className="text-gray-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="font-bold text-lg ml-3">
              ${product.discountedPrice}
            </span>
          </div>
        </div>

        <button
          className="p-2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            nav("/");
          }}
        >
          <span className="text-base">
            <FaPlus />
          </span>
        </button>
      </div>
    </div>
  );
};
