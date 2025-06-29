import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialMediaLogin/SocialLogin";

const Signup = () => {
  const [passwordType, setPasswordType] = useState(false);
  const { creatUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const length = password.length >= 6;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    return length && upperCase && lowerCase;
  };

  const onSubmit = (data) => {
    const { name, image, email, password } = data;

    if (!validatePassword(password)) {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
      } else if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter");
      } else if (!/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter");
      }
      return;
    }

    creatUser(email, password)
      .then(() => {
        updateUserProfile(name, image)
          .then(() => {
            toast.success("Registration Successful", {
              position: "top-right",
              onClose: () => navigate("/"),
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition duration-300 p-4">
      <Helmet>
        <title>SignUp | kajBondu</title>
      </Helmet>
      <ToastContainer autoClose={800} />

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-[85vh]">
        {/* Left Form Side */}
        <div className="p-8 flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-white mb-2 text-center">
            Create an Account 📝
          </h2>
          <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-6">
            Join and start your creative journey!
          </p>
<SocialLogin></SocialLogin>
<h2 className="text-lg text-center pt-3"> Or</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full input dark:border-white border-black bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">Name is required</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">Photo URL</label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full input dark:border-white border-black bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                {...register("image")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full input dark:border-white border-black bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordType ? "text" : "password"}
                  placeholder="•••••••"
                  className="w-full input dark:border-white border-black pr-10 bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 cursor-pointer"
                  onClick={() => setPasswordType(!passwordType)}
                >
                  {passwordType ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">Password is required</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start text-sm mt-3 space-x-2 text-gray-700 dark:text-gray-200">
              <input type="checkbox" className="checkbox checkbox-sm text-blue-600" />
              <span>
                Accept{" "}
                <Link className="font-medium underline text-blue-600 dark:text-blue-400" to="/terms">
                  Terms & Conditions
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn w-full bg-blue-500 hover:bg-blue-700 text-white text-lg"
              >
                Sign Up
              </button>
            </div>

            {/* Login Redirect */}
            <div className="text-center text-sm mt-4 text-gray-700 dark:text-gray-200">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 underline font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Right Image Side */}
        <div className="hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-900 h-full">
          <img
            src="https://github.com/Razzak118348/CraftedCanvas_Image/raw/main/images/register.png"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
