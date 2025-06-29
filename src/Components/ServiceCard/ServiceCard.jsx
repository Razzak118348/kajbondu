import { Link } from "react-router-dom";
import 'animate.css';
import ShareButton from "../ShareButton/ShareButton";
import { IoLocationSharp } from "react-icons/io5";

const ServiceCard = ({ service }) => {
  const { category, subcategories } = service;

  return (
    <>
      {subcategories.map((sub, index) => (
        <div
          key={index}
          className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate__animated animate__fadeInUp hover:shadow-lg transition duration-300 group"
        >
          {/* Image */}
          <img
            src={sub.image}
            alt={sub.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Content */}
          <div className="p-5 space-y-2">
           <h3 className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 rounded-full shadow-sm">
  {category}
</h3>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{sub.title}</h2>
          <div className="flex justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">👤 {sub.workingPersonName}</p>
           <div className="flex"><IoLocationSharp className="mt-1 w-4 h-6 pb-2"/> <p className="text-sm  text-gray-500 dark:text-gray-400"> {sub.address}</p></div>
          </div>

            {/* Book Button */}
            <Link to={`/service/${service._id}`}>
              <ShareButton  text={"Book Now"}></ShareButton>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceCard;
