import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import { FullScreenGallery } from "./FullScreenGallery";
import ModelSizeInfo from "../common/ModelSizeInfo";


const images = [
  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
  "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
];

export const ProductDetailImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoom, setZoom] = useState(false);

  const prevImage = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const nextImage = () => currentIndex < images.length - 1 && setCurrentIndex(currentIndex + 1);
  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = () => setIsFullScreen(false);
  const toggleZoom = () => setZoom(!zoom);

  return (
    <div className="flex flex-col-reverse sm:flex-row lg:flex-row justify-center items-start gap-4 p-4">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[100px] sm:max-h-[400px]">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={`w-16 h-16 cursor-pointer border-2 ${
              idx === currentIndex ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-[500px] sm:w-[500px] h-auto flex items-center justify-center overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Product"
          className={`w-full h-auto max-h-[500px] object-contain cursor-zoom-in transition-transform bg-gray-100 duration-300 ${
            zoom ? "scale-150" : "scale-100"
          }`}
          onClick={toggleZoom}
        />

        {/* Model Size Info */}
        <div className="absolute top-4 left-4">
          <ModelSizeInfo />
        </div>

        {/* Zoom Button */}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow" onClick={openFullScreen}>
          <FaExpand size={20} />
        </button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button className="absolute left-2 bg-white p-2 rounded-full shadow" onClick={prevImage}>
            <FaChevronLeft size={24} />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button className="absolute right-2 bg-white p-2 rounded-full shadow" onClick={nextImage}>
            <FaChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Full-Screen Gallery */}
      {isFullScreen && <FullScreenGallery currentIndexs={currentIndex} onClose={closeFullScreen} />}
    </div>
  );
};
