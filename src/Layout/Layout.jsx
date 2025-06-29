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
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen transition-colors duration-300 ease-in-out "
    style={{
    backgroundImage: "url('../../public/images/bakground.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  }}>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main  className="max-w-7xl mx-auto px-4 md:px-8 "
      >
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
