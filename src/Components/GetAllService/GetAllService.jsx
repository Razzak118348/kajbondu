import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ServiceCard from '../ServiceCard/ServiceCard';
import AOS from "aos";
import "aos/dist/aos.css";

const GetAllService = () => {
  const { allService } = useAuth();
  const initialCount = 9;
  const increment = 6;
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + increment);
  };

  const handleShowLess = () => {
    setVisibleCount(initialCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 py-10 justify-items-center">
        {allService.slice(0, visibleCount).map(service => (
          <div key={service._id} className="w-full" data-aos="fade-up">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="text-center mb-12 space-x-4">
        {visibleCount < allService.length && (
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-300"
          >
            Show More
          </button>
        )}

        {visibleCount > initialCount && (
          <button
            onClick={handleShowLess}
            className="px-6 py-2 bg-pink-300 hover:bg-gray-400 text-gray-800 font-semibold rounded transition duration-300"
          >
            Show Less
          </button>
        )}
      </div>
    </>
  );
};

export default GetAllService;
