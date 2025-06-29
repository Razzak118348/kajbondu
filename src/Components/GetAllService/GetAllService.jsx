import useAuth from '../../hooks/useAuth';
import ServiceCard from '../ServiceCard/ServiceCard';

const GetAllService = () => {
  const { serviceContent } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10
                    justify-items-center"> {/* <-- This line centers each grid item */}
      {serviceContent.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default GetAllService;
