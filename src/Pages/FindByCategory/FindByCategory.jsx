import 'animate.css';
import { useLoaderData } from 'react-router-dom';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';

const FindByCategory = () => {
    const CategoriseData= useLoaderData()
    console.log(CategoriseData);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10 justify-items-center animate__animated animate__backInUp">
            {CategoriseData.map(service => (
            <ServiceCard  key={service._id} service={service} />
        ))}
      </div>
    );
};

export default FindByCategory;