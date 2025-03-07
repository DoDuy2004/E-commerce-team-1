import React, { useEffect, useRef, useState } from "react";
import { productItem } from "../data";
import { ProductCard } from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const ListProduct = ({title, productList}) => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const scrollRef = useRef(null);

  // Scroll Function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth; // Move by container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      setIsStart(scrollRef.current.scrollLeft === 0);
      setIsEnd(
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth - 1 // ✅ Added "-1" for precision
      );
    }
  };

  useEffect(() => {
    checkScroll(); 
    const ref = scrollRef.current;
    console.log(ref)
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
    
  }, []);

  return (
    <>
      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-2 py-4 sm:pt-24 sm:py-10 lg:max-w-7xl lg:px-2 flex justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>

          <div className="flex ">
            <button
              onClick={() => scroll("left")}
              className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition ${
                isStart ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isStart}
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition ${
                isEnd ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isEnd}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth gap-x-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {productList.map((product) => (
              <div
                key={product.id}
                className="w-[calc(100%/4.2)] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <style>
          {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
      </div>
    </>
  );
};
