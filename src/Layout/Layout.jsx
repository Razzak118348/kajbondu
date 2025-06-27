import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import useTheme from '../hooks/useTheme';
import { useEffect } from 'react';

const Layout = () => {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
