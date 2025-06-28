

import { Helmet } from "react-helmet";
import HomepageComponent from "./Component/HomepageComponent";
import Banner from "../../Components/Banner/Banner";



const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Home | kajBondu</title>
            </Helmet>

            <Banner></Banner>
            <HomepageComponent />

        </div>
    );
};

export default Home;
