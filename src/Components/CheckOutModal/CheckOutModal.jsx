// src/components/CheckOutModal.jsx
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const CheckOutModal = ({ service, onClose }) => {
    const { user } = useAuth();
    const { category, subcategories, price, _id, image, priceComment, } = service;

    const handleBookService = async (event) => {
        event.preventDefault();
        const form = event.target;

        const bookingData = {
            serviceId: _id,
            category,
            subcategory: subcategories,
            image,
            name: form.name.value,
            address: form.address.value,
            email: form.email.value,
            phone: form.phone.value,
            date: form.date.value,
            price,
            priceComment,
        };

        try {
            const response = await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    title: 'Your Booking is Complete!',
                    text: 'Thank you for choosing KajBondu!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
                form.reset();
                onClose();
            } else {
                Swal.fire('Error', 'Booking failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Booking Error:', error);
            Swal.fire('Error', 'Server error occurred!', 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xl relative animate__animated animate__fadeInDown">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
                >
                    ×
                </button>

                <form onSubmit={handleBookService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-full text-center mb-2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Book Service: <span className="text-blue-600">{subcategories}</span>
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Category: {category}</p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Your Name</label>
                        <input
                            name="name"
                            defaultValue={user?.displayName || ''}
                            required
                            placeholder="Your Name"
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>
                    {/* address*/}
<div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Your Name</label>
                        <input
                            name="address"
                            required
                            placeholder="Your address"
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>
                    {/* Date */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Date</label>
                        <input
                            name="date"
                            type="date"
                            required
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone</label>
                        <input
                            name="phone"
                            required
                            placeholder="Your Phone Number"
                            className="input input-bordered border-black   bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
                        <input
                            name="email"
                            defaultValue={user?.email || ''}
                            required
                            placeholder="Your Email"
                            className="input input-bordered border-black   bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>
{/* Service category */}
                    <div className="">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Service Category</label>
                        <input
                            name="category"
                            value={category}
                            readOnly
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
</div>
{/* Service Subcategory */}
                    <div className="">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Service Category</label>
                        <input
                            name="Subcategory"
                            value={`${subcategories}`}
                            readOnly
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
</div>
                    {/* Price with Label */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Price</label>
                        <input
                            name="price"
                            value={`৳${price} (${priceComment})`}
                            readOnly
                            className="input input-bordered border-black    bg-white dark:bg-gray-700 dark:text-white w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-full">
                        <input
                            type="submit"
                            value="Confirm Booking"
                            className="btn btn-primary w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOutModal;
