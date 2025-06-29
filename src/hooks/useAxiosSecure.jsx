import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { LogOut } = useAuth()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    console.log('LogOut')
                    LogOut()
                        .then(() => {
                            navigate('/login')
                        })
                        .catch((error)=>{console.log(error)});
                    }
                }
    );
    }, [LogOut, navigate]);
    return axiosSecure;
};

export default useAxiosSecure;