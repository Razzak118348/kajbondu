import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Loading from "../Components/Loading/Loading";

const PrivetRout = ({ children }) => {
    // console.log(children)
    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location.pathname)
    // console.log(loading)
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    else return <Navigate state={location.pathname} to={'/login'}></Navigate>
};
PrivetRout.protoType = {
    children: PropTypes.element,
}
export default PrivetRout;