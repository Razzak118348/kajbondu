import { Link } from "react-router-dom";
import 'animate.css';
import { IoLocationSharp } from "react-icons/io5";

const ServiceCard = ({ service }) => {
  const {
    category,
    subcategories,
    image,
    workingPersonName,
    address,
    _id,
    price,
    priceComment
  } = service;

  return (
    <div
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden animate__animated animate__fadeInUp hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <img
        src={image}
        alt={subcategories}
        className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <h3 className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 rounded-full shadow-sm">
          {category}
        </h3>

        {/* Subcategory Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
          {subcategories}
        </h2>

        {/* Price */}
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          ৳ {price} <span className="text-gray-500 text-xs">({priceComment})</span>
        </p>

        {/* Worker & Location */}
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
          <p className="truncate">👤 {workingPersonName}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <IoLocationSharp className="mr-1 text-lg" />
            <p className="truncate">{address}</p>
          </div>
        </div>

        {/* Book Button */}
        <Link
          to={`/services/id/${_id}`}
          className="inline-block w-full mt-3 text-center px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
