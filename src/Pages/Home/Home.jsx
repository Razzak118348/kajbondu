import { Helmet } from "react-helmet";
import HomepageComponent from "./Component/HomepageComponent";
import Banner from "../../Components/Banner/Banner";
import useAuth from "../../hooks/useAuth";
import GetAllService from "../../Components/GetAllService/GetAllService";

const Home = () => {
  const { allService } = useAuth();

  return (
    <div>
      <Helmet>
        <title>Home | kajBondu</title>
      </Helmet>

      <Banner />
      <HomepageComponent />

<GetAllService></GetAllService>
    </div>
  );
};

export default Home;
