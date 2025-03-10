import React from "react";
import img from "../../assets/img.jpg";
import { TbInfoHexagon } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";

const topSize = ["S", "M", "L", "XL"];
const botSize = ["S", "M", "L", "XL"];
const patterns = [{ img }, { img }, { img }, { img }, { img }];

export const ProductDetailInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="pt-4">
        <div className="flex justify-between text-2xl font-semibold text-[#444143]">
          <h2>Flamenco Frilled & High Waisted</h2>
          <h2>$155</h2>
        </div>
        <h2 className="text-[#ada9ab] text-2xl font-semibold">Bikini</h2>
      </div>
      <div className="w-full">
        <h4 className="text-lg font-semibold text-[#444143] mb-2">Pattern</h4>
        <div className="flex flex-wrap gap-5">
          {patterns &&
            patterns.map((item, index) => {
              return (
                <div
                  className={`${
                    index === 2 ? "border-pink-500" : "border-[#dddcdd]"
                  } w-1/5 border-[1.5px] overflow-hidden p-0.5 rounded-xl cursor-pointer hover:border-pink-500`}
                  key={index}
                >
                  <img className="w-full rounded-lg" src={item.img} alt="" />
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full">
        <h4 className="text-lg font-semibold text-[#444143] mb-2">Top Size</h4>
        <div className="flex flex-wrap gap-5">
          {topSize &&
            botSize.map((item, index) => {
              return (
                <div
                  className={`${
                    index === 2 ? "border-pink-500" : "border-[#ada9ab]"
                  } py-2 px-5 border border-[#ada9ab] overflow-hidden rounded-xl cursor-pointer hover:border-pink-500`}
                  key={index}
                >
                  <span>{item}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full">
        <h4 className="text-lg font-semibold text-[#444143] mb-2">
          Bottom Size
        </h4>
        <div className="flex flex-wrap gap-5">
          {botSize &&
            botSize.map((item, index) => {
              return (
                <div
                  className={`${
                    index === 0 ? "border-pink-500" : "border-[#ada9ab]"
                  } py-2 px-5 border border-[#ada9ab] overflow-hidden p-0.5 rounded-xl cursor-pointer hover:border-pink-500`}
                  key={index}
                >
                  <span>{item}</span>
                </div>
              );
            })}
        </div>
        <span className="flex items-center pt-2 gap-2 text-[#7f7c7d]">
          <TbInfoHexagon /> 8 items left!
        </span>
      </div>
      <div className="w-full px-2 py-3 bg-[#eeebed] text-[#454244] font-semibold rounded-md">
        <h4>Bikini Size</h4>
        <p>Please bear in mind that the fabric is stretchy.</p>
      </div>
      <div className="w-full">
        <span className="block mb-2">Delivery on March 5th-11th</span>
        <div className="flex gap-2">
          <button className="w-4/10 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">Buy now</button>
          <button className="w-4/10 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">
            Add to cart
          </button>
          <button className="flex justify-center items-center w-1/10 border border-[#605d5e] py-3 rounded-md text-2xl cursor-pointer hover:border-pink-400 hover:text-pink-400">
            <CiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};
