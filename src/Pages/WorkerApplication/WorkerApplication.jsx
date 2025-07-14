import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const WorkerApplication = () => {
  const { allService } = useAuth();
  const categories = [...new Set(allService.map(service => service.category))];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://kajbondu-server.vercel.app/worker", data);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Thank you for applying. We'll get in touch soon.",
          confirmButtonColor: "#2563eb"
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl w-full max-w-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Worker Application Form
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered border-black  w-full  bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Enter a valid Bangladeshi phone number"
              }
            })}
            className="input input-bordered border-black   w-full bg-white dark:bg-gray-700 dark:text-white"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="input input-bordered border-black  w-full bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Your address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Age & Gender */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Must be at least 18" }
              })}
              className="input input-bordered border-black  w-full bg-white dark:bg-gray-700 dark:text-white"
              placeholder="18+"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <div className="w-full">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="select select-bordered border-black w-full bg-white dark:bg-gray-700 dark:text-white"
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register("email", {

              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })}
            className="input input-bordered border-black  w-full bg-white dark:bg-gray-700 dark:text-white"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Preferred Category */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Preferred Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered border-black w-full bg-white dark:bg-gray-700 dark:text-white"
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-auto px-6 text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkerApplication;
