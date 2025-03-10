import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sellerData = {
  logo: "https://down-vn.img.susercontent.com/file/23a7300695934c18cea715a64bdd0e16@resize_w160_nl.webp", // Replace with real logo
  name: "Ruze Shoes",
  positiveFeedback: 98.4,
  itemsSold: "674K",
  description:
    "Ruze Shoes was born and raised in Southern California. As a leading Internet shoe retailer, we provide 100% authentic footwear at competitive prices.",
  totalFeedbacks: "229,365",
};

const feedbackData = [
  {
    username: "Alex",
    timeAgo: "Past month",
    comment: "Padding needs to be thicker and needs more support.",
  },
  {
    username: "Chris",
    timeAgo: "Past 6 months",
    comment: "Exactly what I wanted! Good price, good service and really fast!",
  },
  {
    username: "Tommy",
    timeAgo: "Past 6 months",
    comment: "Great seller!",
  },
  { username: "Shara", timeAgo: "Past 6 months", comment: "Nice" },
];

export const SellerProfile = () => {
  const [isFollow, setIsFollow] = useState(false);
  const nav = useNavigate();
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-full flex flex-col md:flex-row gap-6">
      {/* Left: Seller Info */}
      <div className="md:w-1/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={sellerData.logo}
              alt={sellerData.name}
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold">{sellerData.name}</h2>
              <p className="text-sm text-gray-600">
                {sellerData.positiveFeedback}% positive feedback •{" "}
                {sellerData.itemsSold} items sold
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">{sellerData.description}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          <button
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              nav("/white-page");
            }}
          >
            Visit store
          </button>
          {!isFollow ? (
            <>
              <button
                className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              >
                Follow
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              >
                Followed
              </button>
            </>
          )}
          <button className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
            Chat
          </button>
        </div>
      </div>

      {/* Right: Seller Feedback */}
      <div className="md:w-2/3">
        <h3 className="text-lg font-semibold flex ">
          Feedback{" "}
          <div className="flex justify-center items-center ml-5 text-orange-500">
            <FaStar size={16} fill="currentColor" />
            <span className="ml-1 font-medium text-gray-700">4.8 |</span>
            <div className="ml-2 px-1 py-0.5 bg-gray-200 rounded text-xs font-medium text-gray-700">
              2222 Sold
            </div>
          </div>
        </h3>

        {/* Feedback List */}
        <div className="mt-3">
          {feedbackData.map((feedback, index) => (
            <div key={index} className="border-b py-3 text-sm">
              <p className="text-gray-700">
                <span className="text-gray-800 font-semibold">
                  {feedback.username}
                </span>{" "}
                • <span className="text-gray-500">{feedback.timeAgo}</span>
              </p>
              <p className="text-gray-800 mt-1">{feedback.comment}</p>
              <p className="text-gray-500 text-xs mt-1">Verified purchase</p>
            </div>
          ))}
        </div>

        <button className="mt-3 text-black font-semibold cursor-pointer hover:underline">
          See all feedback
        </button>
      </div>
    </div>
  );
};
