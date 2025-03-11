import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/slices/cartSlice";
import { addToWishlistAsync } from "../../redux/slices/wishListSlice";

export const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const cartLoading = useSelector((state) => state.cart.loading);

  const handleAddToCart = async (variantId) => {
    dispatch(addToCartAsync({ variantId, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
      })
      .catch((err) => {
        console.error("Add to Cart Failed:", err);
        toast.error(err);
      });
  };

  const handleAddToWishList = async (productId) => {
    dispatch(addToWishlistAsync({ productId, status: !liked }))
      .unwrap()
      .then(() => {
        setLiked(!liked);
        toast.success(liked ? "Removed from Wishlist!" : "Added to Wishlist!");
      })
      .catch((err) => {
        console.error("Add To Wish List Failed: ", err);
        toast.error(err);
      });
  };
  


  return (
    <div
      class="group relative"
      onClick={() => {
        nav(`/product-detail/${product._id}`);
      }}
    >
      <div className="relative cursor-pointer aspect-square w-full h-80 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out hover:brightness-90 hover:scale-102">
        <button
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
          onClick={(e) => {
            setLiked(!liked);
            e.stopPropagation();
            handleAddToWishList(product._id);
          }}
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl transition" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl transition" />
          )}
        </button>

        <img
          src={product.thumbnail}
          alt="Product Thumbnail"
          className="w-full h-full object-cover p-5 bg-white"
        />
      </div>

      <div class="mt-1 flex justify-between cursor-pointer">
        <div>
          <h3 class="text-xl text-gray-700 font-bold size-3 w-fit h-fit">
            <a>
              <span class=" inset-0"></span>
              {product.name}
            </a>
          </h3>
          <p class="mt-0 text-xl text-gray-500">{product.brand_name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-0 space-x-2">
        <div className="flex items-start flex-col space-x-2 mt-2 text-sm">
          <div className="flex items-center justify-between text-orange-500">
            <FaStar size={16} fill="currentColor" />
            <span className="ml-1 font-medium text-gray-700 text-xl ">
              {product.rating} |
            </span>
            <div className="ml-2 px-1 py-0.5 bg-gray-200 rounded text-xl font-medium text-gray-700">
              {product.quantity_sold} Sold
            </div>
          </div>

          <div>
            <span className="text-gray-400 line-through text-xl ">
              ${product.original_price}
            </span>
            <span className="font-bold text-xl  ml-3">
              ${product.selling_price}
            </span>
          </div>
        </div>

        <button
          className="p-2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.variant_id);
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
