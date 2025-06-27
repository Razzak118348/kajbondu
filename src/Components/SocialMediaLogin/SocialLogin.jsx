import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleLogin, gitHubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location?.state ? location.state : "/";

  const handleSocialMedialLogin = (SocialProvider) => {
    SocialProvider()
      .then((result) => {
        if (result.user) {
          navigate(destination);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
      <button
        onClick={() => handleSocialMedialLogin(googleLogin)}
        className="flex items-center justify-center gap-3 w-full md:w-64 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 transition-all duration-300"
      >
        <FaGoogle className="text-red-500 text-xl" />
        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>

      <button
        onClick={() => handleSocialMedialLogin(gitHubLogin)}
        className="flex items-center justify-center gap-3 w-full md:w-64 px-6 py-3 bg-black border border-gray-800 rounded-lg shadow hover:shadow-md hover:bg-gray-900 transition-all duration-300"
      >
        <FaGithub className="text-white text-xl" />
        <span className="text-sm font-medium text-white">Continue with GitHub</span>
      </button>
    </div>
  );
};

export default SocialLogin;
