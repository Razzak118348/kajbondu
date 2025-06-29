import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShareButton from "../ShareButton/ShareButton";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("/bannerData.json")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("Failed to fetch banner data:", err));
  }, []);

  const scrollToSlide = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="carousel w-full overflow-hidden rounded-t-xl shadow-md">
      {slides.map((slide, index) => {
        const nextId = index === slides.length - 1 ? slides[0].id : slides[index + 1].id;
        const prevId = index === 0 ? slides[slides.length - 1].id : slides[index - 1].id;

        return (
          <div
            key={slide.id}
            id={`slide${slide.id}`}
            className="carousel-item relative w-full h-[400px] md:h-[440px] transition-all duration-700"
          >
            {/* ✅ Image fully visible without zoom or crop */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain bg-black bg-opacity-80 rounded-t-xl"
            />

            {/* ✅ Gradient overlay and content */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-12 text-white rounded-t-xl">
              <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg text-blue-200">{slide.title}</h2>
              <p className="text-sm md:text-base mt-2 max-w-xl">{slide.description}</p>
              <Link to={`/service/${slide.id}`} className="mt-4">
                <ShareButton text="Book Now" />
              </Link>

              {/* Navigation Arrows */}
              <div className="absolute flex justify-between items-center w-full left-0 right-0 px-5 bottom-5">
                <button
                  onClick={() => scrollToSlide(`slide${prevId}`)}
                  className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(`slide${nextId}`)}
                  className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
