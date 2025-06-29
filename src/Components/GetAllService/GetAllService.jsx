import { useEffect, useState } from 'react'; // ✅ fixed here
import useAuth from '../../hooks/useAuth';
import ServiceCard from '../ServiceCard/ServiceCard';
import AOS from "aos";
import "aos/dist/aos.css";

const GetAllService = () => {
  const { allService } = useAuth();
  const [visibleCount, setVisibleCount] = useState(9); // ✅ shows 9 initially

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6); // ✅ loads 6 more on each click
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  px-6 py-10 justify-items-center ">
        {allService.slice(0, visibleCount).map(service => (
          <div key={service._id} className='w-full' data-aos="fade-up">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < allService.length && (
        <div className="text-center mb-12">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default GetAllService;
