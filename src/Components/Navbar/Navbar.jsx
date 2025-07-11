import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import NavTypewriter from "../NavTypewriter/NavTypewriter";

const Navbar = () => {
  const { LogOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

const navItems = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold transition ${
            isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
          }`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/service"
        className={({ isActive }) =>
          `font-semibold transition ${
            isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
          }`
        }
      >
        All Service
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink
          to="/my-booking"
          className={({ isActive }) =>
            `font-semibold transition ${
              isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
            }`
          }
        >
          My Booking
        </NavLink>
      </li>
    )}

 <li>
      <NavLink
        to="/workerApplication"
        className={({ isActive }) =>
          `font-semibold transition ${
            isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
          }`
        }
      >
        Apply as Worker
      </NavLink>
    </li>

    {user?.email==="abdurrazzak118348@gmail.com" && (
      <li>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `font-semibold transition ${
              isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
            }`
          }
        >
          Admin
        </NavLink>
      </li>
    )}

    <li>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `font-semibold transition ${
            isActive ? "text-blue-600 underline underline-offset-4" : "hover:text-blue-500"
          }`
        }
      >
        About us
      </NavLink>
    </li>
  </>
);

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-auto">
          {/* Left side - Brand & Hamburger */}
          <div className="flex items-center">
            <div className="mr-3 lg:hidden dropdown">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1000] p-3 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 space-y-2"
              >
                {navItems}
              </ul>
            </div>

            <Link to="/" className="text-xl lg:text-3xl font-extrabold text-blue-500 dark:text-blue-400 flex">
              <img className="w-12 h-10" src="https://raw.githubusercontent.com/Razzak118348/kajbonduimage/main/Image/icon.png" alt="" />
              <NavTypewriter />
            </Link>
          </div>

          {/* Center Nav - Only large devices */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6">{navItems}</ul>
          </div>

          {/* Right side - Theme Toggle & Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm bg-gray-200 dark:bg-gray-700 border-none hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title="Toggle Theme"
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>

            {/* Profile or Login */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-blue-600 shadow-sm"
                    title={user?.displayName || "User name not found"}
                  >
                    <img
                      src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/219/219986.png"}
                      alt="user"
                      className="object-cover rounded-full"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[1000] p-3 shadow-md bg-white dark:bg-gray-800 rounded-box w-48 space-y-2"
                >
                  <li className="text-gray-700 dark:text-white font-semibold text-sm">
                    {user?.displayName || "User name not found"}
                  </li>
                  <li>
                    <button
                      onClick={LogOut}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
