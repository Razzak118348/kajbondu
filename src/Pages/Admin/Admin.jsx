import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Admin = () => {
  const allWorker = useLoaderData(); // passed from loader
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bookings")
      .then((res) => setAllBookings(res.data))
      .catch((err) => console.error("Booking fetch error:", err));
  }, []);

  return (
    <div className="min-h-[75vh] px-4 py-10 container mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
        Admin Panel
      </h1>

      {/* All Bookings Table */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">All Bookings ({allBookings.length})</h2>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="table-auto w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="bg-blue-600 text-white dark:bg-blue-700">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Service ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Subcategory</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Price Comment</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking, i) => (
                <tr key={booking._id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{booking.serviceId}</td>
                  <td className="px-4 py-3">{booking.category}</td>
                  <td className="px-4 py-3">{booking.subcategory}</td>
                  <td className="px-4 py-3">
                    <img src={booking.image} alt="service" className="w-14 h-14 rounded-md object-cover" />
                  </td>
                  <td className="px-4 py-3">{booking.name}</td>
                  <td className="px-4 py-3">{booking.email}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">{booking.address}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">৳ {booking.price}</td>
                  <td className="px-4 py-3">{booking.priceComment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Worker Applications Table */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">All Worker Applications ({allWorker.length})</h2>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="table-auto w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="bg-blue-600 text-white dark:bg-blue-700">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {allWorker.map((worker, i) => (
                <tr key={worker._id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{worker.name}</td>
                  <td className="px-4 py-3">{worker.phone}</td>
                  <td className="px-4 py-3">{worker.email}</td>
                  <td className="px-4 py-3">{worker.address}</td>
                  <td className="px-4 py-3">{worker.age}</td>
                  <td className="px-4 py-3">{worker.gender}</td>
                  <td className="px-4 py-3">{worker.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
