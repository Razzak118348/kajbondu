import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "animate.css";

// Icons
import { MdCleaningServices, MdPlumbing } from "react-icons/md";
import {
  FaPaintRoller,
  FaPlug,
  FaUserGraduate,
  FaTruck,
  FaTools,
} from "react-icons/fa";
import { GiPikeman } from "react-icons/gi";
import ShareButton from "../../../Components/ShareButton/ShareButton";
import useAuth from "../../../hooks/useAuth";

// Icon Map
const iconMap = {
  MdCleaningServices: <MdCleaningServices />,
  FaPaintRoller: <FaPaintRoller />,
  FaPlug: <FaPlug />,
  FaTruck: <FaTruck />,
  FaUserGraduate: <FaUserGraduate />,
  FaTools: <FaTools />,
  MdPlumbing: <MdPlumbing />,
  GiPikeman: <GiPikeman />,
};

// Color Map for Light Mode
const colorMap = {
  MdCleaningServices: "bg-blue-100",
  FaPaintRoller: "bg-green-100",
  FaPlug: "bg-yellow-100",
  FaTruck: "bg-pink-200",
  FaUserGraduate: "bg-indigo-200",
  FaTools: "bg-cyan-100",
  MdPlumbing: "bg-orange-100",
  GiPikeman: "bg-purple-200",
};

const HomepageComponent = () => {
  const [services, setServices] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("/services.json")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error loading services:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-gray-800 dark:text-white bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
        <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[240px] py-16 px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-xl md:text-2xl font-extrabold leading-snug bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text dark:from-yellow-300 dark:to-pink-400">
              Welcome to <span className=" decoration-wavy decoration-pink-400">kajBondu</span>
            </h1>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Experience effortless service booking with <span className="font-semibold text-blue-600 dark:text-yellow-300">kajBondu</span> — from Cleaning, Painting, Electrical, Shifting, Tuition, Repair, Plumbing to Labor. All your home needs in one smart platform.
            </p>
            <Link to={user ? "/service" : "/signup"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ShareButton text={"Get Started"} />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Animated background blobs */}
        <div className="absolute top-6 left-6 w-28 h-28 bg-blue-300 dark:bg-yellow-400 opacity-20 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute bottom-6 right-6 w-32 h-32 bg-purple-400 dark:bg-pink-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-800 transition-colors">
     <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-14 text-center">
  Discover Our Most Popular Home Services
</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative group p-4 w-32 h-32 md:w-36 md:h-36 flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-300
                ${colorMap[service.icon] || "bg-indigo-100"} dark:bg-gray-700 dark:shadow-gray-900`}
            >
              {/* Hover Glow */}
              <div className="absolute -inset-1 z-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500 bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-500"></div>

              <Link
                to={`/services/category/${encodeURIComponent(service.category)}`}
                className="text-4xl text-blue-600 dark:text-pink-400 z-10 transition-transform group-hover:scale-110"
              >
                {iconMap[service.icon]}
              </Link>
              <Link to={`/services/category/${encodeURIComponent(service.category)}`} className="mt-3 text-sm md:text-base font-medium text-gray-800 dark:text-blue-300 z-10 text-center">
                {service.category}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomepageComponent;
