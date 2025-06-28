// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Banner = () => {
//   const [slides, setSlides] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/bannerData.json")
//       .then((res) => setSlides(res.data))
//       .catch((err) => console.error("Failed to fetch banner data:", err));
//   }, []);

//   return (
//     <div className="carousel w-full rounded-xl overflow-hidden">
//       {slides.map((slide, index) => {
//         const nextId = index === slides.length - 1 ? slides[0].id : slides[index + 1].id;
//         const prevId = index === 0 ? slides[slides.length - 1].id : slides[index - 1].id;

//         return (
//           <div
//             key={slide.id}
//             id={`slide${slide.id}`}
//             className="carousel-item relative w-full h-96 transition-all duration-700 ease-in-out"
//           >
//             <img src={slide.image} alt={slide.title} className="w-full object-cover" />

//             <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-end md:justify-center px-6 md:px-12 pb-8 text-white space-y-5">
//               <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
//               <p className="text-sm md:text-base">{slide.description}</p>
//               <Link to={`/service/${slide.id}`}>
//                 <button className="btn btn-secondary mt-2">Book Now</button>
//               </Link>

//               <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0 md:bottom-5">
//                 <a href={`#slide${prevId}`} className="btn btn-circle bg-pink-500 text-white border-none">❮</a>
//                 <a href={`#slide${nextId}`} className="btn btn-circle bg-pink-500 text-white border-none">❯</a>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Banner;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("/bannerData.json")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("Failed to fetch banner data:", err));
  }, []);

  const scrollToTop = (id) => {
    // Prevent scroll jump
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="carousel w-full overflow-hidden">
      {slides.map((slide, index) => {
        const nextId = index === slides.length - 1 ? slides[0].id : slides[index + 1].id;
        const prevId = index === 0 ? slides[slides.length - 1].id : slides[index - 1].id;

        return (
          <div
            key={slide.id}
            id={`slide${slide.id}`}
            className="carousel-item relative w-full h-96"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-t-xl"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-end md:justify-center px-6 md:px-12 pb-8 text-white space-y-5 rounded-t-xl">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-base">{slide.description}</p>
              <Link to={`/service/${slide.id}`}>
                <button className="btn btn-secondary mt-2">Book Now</button>
              </Link>

              {/* Custom buttons with onClick */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0 md:bottom-5">
                <button
                  onClick={() => scrollToTop(`slide${prevId}`)}
                  className="btn btn-circle bg-blue-500 text-white border-none"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToTop(`slide${nextId}`)}
                  className="btn btn-circle bg-blue-500 text-white border-none"
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

