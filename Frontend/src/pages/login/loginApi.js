import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { addUser } from "../../redux/slice/userSlice";

export const LoginApi = (userData, dispatch, navigate) => {
    axios.post('/api/auth/login', userData)
        .then((response) => {
            if (response.data.success === false) {
                return toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            dispatch(addUser(response.data));
            navigate('/');
        })
        .catch((err) => {
            //error handling to get a specified error message
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        });
}