import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShareButton from "../ShareButton/ShareButton";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Fetch slide data
  useEffect(() => {
    axios
      .get("/bannerData.json")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("Failed to fetch banner data:", err));
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [slides]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current); // Optional: pause auto-scroll when manually navigating
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const nextIndex = (currentIndex + 1) % slides.length;
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

  return (
    <div className="w-full overflow-hidden rounded-t-xl shadow-md relative h-[400px] md:h-[440px]">
      <div className="w-full h-full relative">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-contain bg-black bg-opacity-80 rounded-t-xl"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-12 text-white rounded-t-xl">
          <h2 className="text-xl md:text-2xl font-bold drop-shadow-lg text-blue-200">
            {currentSlide.title}
          </h2>
          <p className="text-sm md:text-base mt-2 max-w-xl">
            {currentSlide.description}
          </p>
          <Link to={`/services/category/${currentSlide.category}`} className="mt-4">
            <ShareButton text="Book Now" />
          </Link>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute flex justify-between items-center w-full left-0 right-0 px-5 bottom-5">
          <button
            onClick={() => goToSlide(prevIndex)}
            className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            ❮
          </button>
          <button
            onClick={() => goToSlide(nextIndex)}
            className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;


