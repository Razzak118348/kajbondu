import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdTurnLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBooking = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();
  const url = `/bookings?email=${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(url)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://kajbondu-server.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete booking");
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount) {
              setBookings((prev) => prev.filter((booking) => booking._id !== id));
              Swal.fire("Deleted!", "Booking has been deleted.", "success");
            } else {
              Swal.fire("Error", "Could not delete the booking.", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Failed to delete the booking.", "error"));
      }
    });
  };

  return (
    <div className="min-h-[60vh] flex flex-col dark:bg-gray-900">
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h2 className="text-center text-3xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">
          My Bookings ({bookings.length})
        </h2>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <table className="w-full table-auto text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-indigo-600 dark:bg-indigo-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">No</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Subcategory</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={booking.image}
                        alt={booking.service}
                        className="w-16 h-16 object-cover rounded-md shadow"
                      />
                    </td>
                    <td className="px-4 py-3">{booking.category}</td>
                    <td className="px-4 py-3">{booking.subcategory}</td>
                    <td className="px-4 py-3">{booking.address}</td>
                    <td className="px-4 py-3">{booking.phone}</td>
                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                      ৳ {booking.price}{booking.priceComment}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-xs font-medium">
                        Booked
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="bg-red-600 px-2 py-1 rounded-lg text-white transition duration-200"
                        title="Delete booking"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            <p>You have no bookings yet.</p>
          </div>
        )}

        {/* Continue Shopping */}
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
              <MdTurnLeft className="text-xl" />
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
