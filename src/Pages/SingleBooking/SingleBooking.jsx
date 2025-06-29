// import 'animate.css';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link, useLoaderData } from "react-router-dom";

// const SingleBooking = () => {
//   const BookingService = useLoaderData();
//   const [allServiceByCategory, setAllServiceByCategory] = useState([]);

//   const {
//     subcategories,
//     category,
//     address,
//     workingPersonEmail,
//     workingPersonName,
//     availableTime,
//     description,
//     image,
//     _id,
//      price,
//     priceComment
//   } = BookingService;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/services/category/${category}`)
//       .then(res => setAllServiceByCategory(res.data))
//       .catch(err => console.error("Service fetch error:", err));
//   }, [category]);

//   const relatedServices = allServiceByCategory.filter(item => item._id !== _id);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div
//         className={`grid grid-cols-1 ${
//           relatedServices.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-1 justify-center'
//         } gap-8`}
//       >
//         {/* Left Section */}
//         <div
//           className={`${
//             relatedServices.length > 0 ? 'md:col-span-2' : 'w-full flex justify-center'
//           } space-y-6`}
//         >
//           <div className="max-w-2xl w-full">
//             <div className="flex items-center space-x-5">
//               <img
//                 src={image}
//                 alt={subcategories}
//                 className="w-32 h-32 object-cover rounded-full border shadow-md"
//               />
//               <div className="animate__animated animate__backInLeft">
//                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{subcategories}</h1>
//                 <p className="text-lg text-blue-600 font-medium">{category}</p>
//                 {/* Price */}
//         <p className="text-sm font-medium text-green-600 dark:text-green-400">
//           ৳ {price} <span className="text-gray-500 text-xs">({priceComment})</span>
//         </p>

//                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
//                   👤 Working Person is <strong>{workingPersonName}</strong>
//                 </p>
//                 <p><strong>🕒 Available:</strong> {availableTime}</p>
//                 <p><strong>📍 Address:</strong> {address}</p>
//                 <p><strong>📧 Email:</strong> {workingPersonEmail}</p>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
//               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
//               <hr className="border-t mt-4 border-gray-300 dark:border-gray-600" />
//               <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section (Related Services) */}
//         {relatedServices.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
//               Related Services in <span className="text-blue-600">{category}</span>
//             </h2>

//             <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
//               {relatedServices.map(item => (
//                 <div
//                   key={item._id}
//                   className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-3"
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt={item.subcategories}
//                       className="w-14 h-14 object-cover rounded-md shadow"
//                     />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.subcategories}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">{item.workingPersonName}</p>
//                     </div>
//                   </div>
//                   <Link
//                     to={`/services/id/${item._id}`}
//                     className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
//                   >
//                     Switch Booking
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleBooking;


// src/pages/SingleBooking.jsx
import 'animate.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import CheckOutModal from '../../Components/CheckOutModal/CheckOutModal';


const SingleBooking = () => {
  const BookingService = useLoaderData();
  const [allServiceByCategory, setAllServiceByCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    subcategories,
    category,
    address,
    workingPersonEmail,
    workingPersonName,
    availableTime,
    description,
    image,
    _id,
    price,
    priceComment
  } = BookingService;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/services/category/${category}`)
      .then(res => setAllServiceByCategory(res.data))
      .catch(err => console.error("Service fetch error:", err));
  }, [category]);

  const relatedServices = allServiceByCategory.filter(item => item._id !== _id);

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Checkout Modal */}
      {showModal && (
        <CheckOutModal
          service={BookingService}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className={`grid grid-cols-1 ${
          relatedServices.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-1 justify-center'
        } gap-8`}
      >
        {/* Left Section */}
        <div
          className={`${
            relatedServices.length > 0 ? 'md:col-span-2' : 'w-full flex justify-center'
          } space-y-6`}
        >
          <div className="max-w-2xl w-full">
            <div className="flex items-center space-x-5">
              <img
                src={image}
                alt={subcategories}
                className="w-32 h-32 object-cover rounded-full border shadow-md"
              />
              <div className="animate__animated animate__backInLeft">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{subcategories}</h1>
                <p className="text-lg text-blue-600 font-medium">{category}</p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  ৳ {price} <span className="text-gray-500 text-xs">({priceComment})</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  👤 Working Person is <strong>{workingPersonName}</strong>
                </p>
                <p><strong>🕒 Available:</strong> {availableTime}</p>
                <p><strong>📍 Address:</strong> {address}</p>
                <p><strong>📧 Email:</strong> {workingPersonEmail}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
              <hr className="border-t mt-4 border-gray-300 dark:border-gray-600" />
              <button
                onClick={() => setShowModal(true)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Related Services */}
        {relatedServices.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Related Services in <span className="text-blue-600">{category}</span>
            </h2>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {relatedServices.map(item => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.subcategories}
                      className="w-14 h-14 object-cover rounded-md shadow"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.subcategories}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.workingPersonName}</p>
                    </div>
                  </div>
                  <Link
                    to={`/services/id/${item._id}`}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    Switch Booking
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBooking;
