import { Helmet } from "react-helmet";
import HomepageComponent from "./Component/HomepageComponent";
import Banner from "../../Components/Banner/Banner";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import useAuth from "../../hooks/useAuth";

const Home = () => {
    const { serviceContent } = useAuth();
    const subcategoryCards = serviceContent.flatMap(service =>
        service.subcategories.map(sub => ({
            ...sub,
            category: service.category,
            _id: service._id
        }))
    );

    const topCards = subcategoryCards.slice(0, 9);
    return (
        <div className="">
            <Helmet>
                <title>Home | kajBondu</title>
            </Helmet>

            <Banner />
            <HomepageComponent />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10 justify-items-center">
                {topCards.map((card, idx) => (
                    <ServiceCard key={idx} service={{ category: card.category, subcategories: [card], _id: card._id }} />
                ))}
            </div>
        </div>
    );
};

export default Home;
