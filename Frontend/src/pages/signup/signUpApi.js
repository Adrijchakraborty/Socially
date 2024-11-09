import axios from "axios";
import { Bounce, toast } from "react-toastify";


export const signUpApi = (data, navigate, setUserInfo) => {
    axios.post('/api/auth/sign-up', data)
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
            toast.success('Registration successful!', {
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
            setUserInfo(response.data)
            navigate('/select-topics')
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