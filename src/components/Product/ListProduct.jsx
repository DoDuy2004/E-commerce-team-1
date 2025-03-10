import React, { useState } from "react";
import Slider from "react-slick";
import { ProductCard } from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ListProduct = ({ title, productList }) => {
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Disable prev/next buttons when at the first or last slide
  const totalSlides = productList.length;
  const slidesToShow = 4; // Adjust based on screen size

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  // Slider settings
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 4, // Default for large screens
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-2 py-4 sm:pt-24 sm:py-10 lg:max-w-7xl lg:px-2 flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className={`bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-gray-100 transition 
              ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentSlide === 0}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer
              ${
                currentSlide >= totalSlides - slidesToShow
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            disabled={currentSlide >= totalSlides - slidesToShow}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {productList.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
