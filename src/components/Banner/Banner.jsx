import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import BannerItem from "./BannerItem";


const Banner = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  // Gọi API khi component mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/ads/active"
        );
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ads.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  if (!ads.length) {
    return <div className="px-16 pt-10 h-[500px] ">No ads available</div>;
  }

  return (
    <div className="mt-5 relative overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {ads.map((ad, index) => (
          <BannerItem
            key={index}
            index={index}
            image={ad.image}
            title={ad.title}
            discount={ad.discountInfo}
          />
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-white/30 p-3 rounded-full hover:bg-white/50 transition-all"
      >
        <FaChevronLeft className="text-white text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white/30 p-3 rounded-full hover:bg-white/50 transition-all"
      >
        <FaChevronRight className="text-white text-2xl" />
      </button>

      <div className="absolute bottom-10 left-[10%] transform flex gap-2">
        {ads.slice(0,4).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
