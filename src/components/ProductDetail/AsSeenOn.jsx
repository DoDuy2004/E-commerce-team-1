import React from "react";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Slider from "react-slick";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-1 hover:scale-110 transition-transform text-gray-600 cursor-pointer" 
      style={{ top: "50%", transform: "translateY(-50%)", fontSize: "24px" }}
    >
      <BiChevronLeft size={28} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 bg-white shadow-lg rounded-full p-1 hover:scale-110 transition-transform text-gray-600 cursor-pointer"
      style={{ top: "50%", transform: "translateY(-50%)", fontSize: "24px" }}
    >
      <BiChevronRight size={28} />
    </button>
  );
};

const logos = [
    {
      src: "data:image/png;base64,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",
      alt: "The Guardian",
      link: "https://www.theguardian.com",
    },
    {
      src: "data:image/png;base64,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",
      alt: "Vogue",
      link: "https://www.vogue.com",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWx1Z7nF24ON5Pbj21xiwx6Dl9vRytxnn_g&s",
      alt: "Independent",
      link: "https://www.independent.co.uk",
    },
    {
      src: "data:image/png;base64,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",
      alt: "Forbes",
      link: "https://www.forbes.com",
    },
    {
      src: "data:image/png;base64,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",
      alt: "BBC",
      link: "https://www.bbc.com",
    },
  ];

const AsSeenOn = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = logos.length;
    const slidesToShow = 3;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Shows prev/next arrows
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    prevArrow: currentSlide > 0 ? <CustomPrevArrow /> : null,
    nextArrow: currentSlide < totalSlides - slidesToShow ? <CustomNextArrow /> : null,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="w-full py-12 mt-10">
      <h2 className="text-center text-2xl font-bold mb-8">As seen on</h2>
      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {logos.map((logo, idx) => (
            <div key={idx} className="px-4">
              <a
                href={"http://localhost:5173/white-page"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-50 shadow-lg rounded-xl p-6 h-40"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-24 w-auto object-contain"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AsSeenOn;
