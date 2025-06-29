import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import 'animate.css';

// Icons
import { MdCleaningServices, MdPlumbing } from "react-icons/md";
import { FaPaintRoller, FaPlug, FaUserGraduate, FaTruck, FaTools } from "react-icons/fa";
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
    GiPikeman: <GiPikeman />
};
// colorMap
const colorMap = {
  MdCleaningServices: "bg-blue-100",
  FaPaintRoller: "bg-green-100",
  FaPlug: "bg-yellow-100",
  FaTruck: "bg-pink-200",
  FaUserGraduate: "bg-indigo-200",
  FaTools: "bg-cyan-100",
  MdPlumbing: "bg-orange-100",
  GiPikeman: "bg-purple-300",
};
const HomepageComponent = () => {
    const [services, setServices] = useState([]);
const{ user }= useAuth();

    useEffect(() => {
        axios.get("/services.json")
            .then((res) => setServices(res.data))
            .catch((err) => console.error("Error loading services:", err));
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-500 mt-0">

           {/* Hero Section */}
<section className="relative overflow-hidden text-gray-800 dark:text-white bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 transition-colors duration-500">
  <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[180px] py-10">
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-3 bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text dark:from-yellow-300 dark:to-pink-400">
        Welcome to <span className="dark:decoration-pink-500">kajBondu</span>
      </h1>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Experience effortless service booking with <span className="font-medium text-blue-600 dark:text-yellow-400">kajBondu</span> — from Cleaning, Painting, Electrical, Shifting, Tuition, Repair, Plumbing to Labor. All your home needs in one smart platform.
      </p>
      <Link to={user ? "/service" : "/signup"}>
        <ShareButton text={"Get Started"} />
      </Link>
    </motion.div>
  </div>

  {/* Animated background shapes */}
  <div className="absolute top-6 left-4 w-20 h-20 bg-blue-300 opacity-20 rounded-full blur-2xl animate-ping dark:bg-yellow-300"></div>
  <div className="absolute bottom-6 right-4 w-24 h-24 bg-purple-300 opacity-20 rounded-full blur-2xl animate-pulse dark:bg-pink-400"></div>
</section>


            {/* Services Section */}
            <section className="py-16 px-6 md:px-20 text-center bg-gray-50 dark:bg-gray-800 transition-colors">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-10">
                    Our Popular Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.15 }}
                            className={`p-4 animate__animated animate__swing animate__delay-2s w-28 lg:w-36 mx-auto rounded-xl shadow-md  ${
  colorMap[service.icon]
} dark:shadow-gray-700 transition-all`}
                        >
                            <Link to={`/services/category/${service.category}`} className="text-4xl flex justify-center items-center text-blue-600 mb-3 dark:text-pink-600">
                                {iconMap[service.icon]}
                            </Link>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-blue-500">
                                {service.category}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </section>


        </div>
    );
};

export default HomepageComponent;
