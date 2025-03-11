"use client";

import { useState } from "react";
import { TbInfoHexagon } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { BsTicketPerforated } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

export const ProductDetailInfo = ({
  product,
  variants,
  attributes,
  selectedVariant,
  onVariantChange,
}) => {
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);

  const handleAttributeSelect = (type, value) => {
    const newVariant = variants.find((v) =>
      v.attributes.some((attr) => attr.type === type && attr.value === value)
    );
    if (newVariant) {
      onVariantChange(newVariant._id);
    }
  };

  const getAttributeValue = (type) => {
    return selectedVariant?.attributes.find((attr) => attr.type === type)
      ?.value;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-4">
        <div className="flex justify-between text-2xl font-semibold text-[#444143]">
          <h2>{product.name}</h2>
          <h2 className="flex items-center gap-5">
            <div className="flex items-center gap-1 relative">
              <span className="block text-3xl text-red-500">
                $
                {selectedVariant?.salePrice?.toFixed(2) ||
                  selectedVariant?.price.toFixed(2)}
              </span>
              {selectedVariant.salePrice && (
                <>
                  <BsTicketPerforated className="text-red-500" />
                  <FaCheckCircle className="text-sm text-red-500 absolute right-[-5%] bottom-[10%] bg-white" />
                </>
              )}
            </div>
            {selectedVariant?.salePrice && (
              <span className="block line-through text-xl text-[#7b7779]">
                ${selectedVariant.price.toFixed(2)}
              </span>
            )}
          </h2>
        </div>
        <h2 className="text-[#ada9ab] text-2xl font-semibold">
          {product.brand_name}
        </h2>
      </div>

      {attributes.map((attribute) => (
        <div key={attribute.type} className="w-full">
          <h4 className="text-lg font-semibold text-[#444143] mb-2">
            {attribute.type}
          </h4>
          <ul className="flex flex-wrap gap-5">
            {attribute.values.map((value, index) => (
              <li
                key={index}
                className={`py-2 px-5 border-2 ${
                  getAttributeValue(attribute.type) === value
                    ? "border-pink-500"
                    : "border-[#ada9ab]"
                } overflow-hidden rounded-xl cursor-pointer hover:border-pink-500`}
                onClick={() => handleAttributeSelect(attribute.type, value)}
              >
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="w-full">
        <span className="flex items-center pt-2 gap-2 text-[#7f7c7d]">
          <TbInfoHexagon /> {selectedVariant?.stock || 0} items left!
        </span>
      </div>
      <div className="w-full px-2 py-3 bg-[#eeebed] text-[#454244] font-semibold rounded-md">
        <h4>{product.name} Specifications</h4>
        <p>{product.description}</p>
      </div>
      <div className="w-full">
        <span className="block mb-2">Delivery on March 5th-11th</span>
        <div className="flex gap-2">
          <button className="w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">
            Buy now
          </button>
          <button className="w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">
            Add to cart
          </button>
          <button className="flex justify-center items-center w-1/9 border border-[#605d5e] py-3 rounded-md text-2xl cursor-pointer hover:border-pink-400 hover:text-pink-400">
            <CiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};
