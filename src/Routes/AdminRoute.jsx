import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const adminEmails = [
    "abdurrazzak118348@gmail.com",
    "alfat422@gmail.com",
    "sheikhimtiyaz3333@gmail.com",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-blue-600"></span>
      </div>
    );
  }

  if (user && adminEmails.includes(user.email)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
