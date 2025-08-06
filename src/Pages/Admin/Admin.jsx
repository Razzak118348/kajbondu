import axios from 'axios';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Admin = () => {
  const { workers: loadedWorkers, bookings } = useLoaderData();

  // State for bookings and workers
  const [allBookings, setAllBookings] = useState(bookings);
  const [allWorkers, setAllWorkers] = useState(loadedWorkers);

  const [searchPhone, setSearchPhone] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Handle delete booking
  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This booking will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://kajbondu-server.vercel.app/bookings/${id}`);
          setAllBookings(allBookings.filter((b) => b._id !== id));
          toast.success("Booking deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete booking.");
        }
      }
    });
  };

  // Handle delete worker application
  const handleDeleteWorker = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This worker application will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://kajbondu-server.vercel.app/worker/${id}`);
          setAllWorkers(allWorkers.filter((worker) => worker._id !== id));
          Swal.fire('Deleted!', 'Worker application has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete worker application.', 'error');
        }
      }
    });
  };

  // Filtering bookings
  const filteredBookings = allBookings.filter((booking) =>
    booking.phone.toLowerCase().includes(searchPhone.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / pageSize);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Filtering workers
  const filteredWorkers = allWorkers.filter((worker) =>
    worker.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="min-h-[75vh] px-4 py-10 container mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
        Admin Panel
      </h1>

      {/* Bookings Table */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
          All Bookings ({filteredBookings.length})
        </h2>

        <input
          type="text"
          placeholder="Search by phone number..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="mb-4 p-2 border text-white dark:text-gray-300 rounded w-full max-w-md mx-auto block"
        />

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
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center py-4 text-red-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking, i) => (
                  <tr key={booking._id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{(currentPage - 1) * pageSize + i + 1}</td>
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
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Workers Table */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          All Worker Applications ({filteredWorkers.length})
        </h2>

        <input
          type="text"
          placeholder="Search worker by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="mb-4 text-white dark:text-gray-300 p-2 border rounded w-full max-w-md mx-auto block"
        />

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
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-red-500">
                    No workers found.
                  </td>
                </tr>
              ) : (
                filteredWorkers.map((worker, i) => (
                  <tr key={worker._id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{worker.name}</td>
                    <td className="px-4 py-3">{worker.phone}</td>
                    <td className="px-4 py-3">{worker.email}</td>
                    <td className="px-4 py-3">{worker.address}</td>
                    <td className="px-4 py-3">{worker.age}</td>
                    <td className="px-4 py-3">{worker.gender}</td>
                    <td className="px-4 py-3">{worker.category}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteWorker(worker._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
