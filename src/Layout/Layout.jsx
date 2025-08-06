import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import useTheme from '../hooks/useTheme';
import { useEffect } from 'react';
import Footer from '../Components/Footer/Footer';

const Layout = () => {
  const { theme } = useTheme();

  // Set dark mode class based on theme value
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div
      className="min-h-screen transition-colors duration-300 ease-in-out
    bg-white text-gray-800
          dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 dark:text-white"
    >
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>

  );
};

export default Layout;
