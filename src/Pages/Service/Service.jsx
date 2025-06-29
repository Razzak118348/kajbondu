import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';

const Service = () => {
  const { allService } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);

  // Unique categories
  const uniqueCategories = [...new Set(allService.map(service => service.category))];

  // Filter services
  useEffect(() => {
    if (selectedCategory) {
      setFilteredServices(allService.filter(service => service.category === selectedCategory));
    } else {
      setFilteredServices(allService);
    }
  }, [selectedCategory, allService]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
          Our Services
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Explore a wide range of services tailored to meet your needs. Select a category to filter.
        </p>
      </div>

      {/* Mobile Dropdown Filter */}
      <div className="mb-6 md:hidden">
        <select
          className="w-full p-3 border rounded-md text-sm sm:text-base
            bg-white text-gray-800 border-gray-300
            dark:bg-gray-800 dark:text-white dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          value={selectedCategory || ''}
        >
          <option value="">All Services</option>
          {uniqueCategories.map((category, i) => (
            <option key={i} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Categories
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium transition
                    ${!selectedCategory
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  All Services
                </button>
              </li>
              {uniqueCategories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md font-medium transition
                      ${selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Service Cards */}
        <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-300 text-sm md:text-base">
              No services found for this category.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Service;
