import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Button } from "../Button";

const products = [
  {
    id: 1,
    name: "Product Name Will Be Here",
    price: "$56.78",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Product Name Will Be Here",
    price: "$56.78",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg", // Replace with actual image URL
  },
];

export const TopSelling = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Featured Product */}
      <div className="md:col-span-2 flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-6">
        <div className="flex-1 md:basis-2/3">
          <img
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt="Featured Product"
            className="w-full h-auto md:h-[450px] object-cover rounded-lg"
          />
        </div>
        <div className="md:basis-1/3 md:ml-6 text-center md:text-left">
          <p className="text-sm text-gray-500 uppercase">Top Selling</p>
          <h2 className="text-2xl font-bold text-gray-800">
            Product Name Will Be Here
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
            <span className="text-gray-400 line-through text-lg">$64.78</span>
            <span className="text-lg font-bold text-gray-800">$56.78</span>
          </div>
          <div className="flex justify-center items-center">
            <Button
              style={
                "mt-4 flex justify-center items-center px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition cursor-pointer"
              }
              content={`Start Shopping`}
              icon={<FaShoppingBag className="mr-2" />}
            />
          </div>
        </div>
      </div>

      {/* Right Side - Small Product Cards */}
      <div className="flex flex-col space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 rounded-lg shadow-lg space-x-4"
          >
            <div className="flex flex-col">
              <p className="text-gray-700 font-semibold">{product.name}</p>
              <span className="text-gray-900 font-bold">{product.price}</span>
            </div>
            <div className="flex justify-end">
              <img
                src={product.image}
                alt={product.name}
                className="w-52 h-52 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
