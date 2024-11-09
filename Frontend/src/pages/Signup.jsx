import React, { useContext, useRef, useState } from 'react'
import SignupForm from './signup/SignupForm'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider1, provider2 } from '../services/GoogleAuth/config'
import { signInWithPopup } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import { generatePassword } from '../utils/Password'
import axios from 'axios'
import { GlobalContext } from '../context/Context'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import Loader from '../utils/Loader'
import { signUpApi } from './signup/signUpApi'


const Signup = () => {
  const [data, setData] = useState();
  const dialogRef = useRef(null);
  const closeDialog = () => {
    dialogRef.current.close();
  };

  const { setUserInfo } = useContext(GlobalContext)


  const navigate = useNavigate();

  //this will be called if someone log in with google
  const submitGoogleAuthData = (e) => {
    e.preventDefault();
    signUpApi(data, navigate, setUserInfo);
    dialogRef.current.close();
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  }

  const handleClick = (provider) => {
    signInWithPopup(auth, provider).then((Data) => {
      let num = Math.random() * 1000000;
      let password = generatePassword();
      setData({
        ...data,
        ["firstName"]: Data._tokenResponse.firstName,
        ["lastName"]: Data._tokenResponse.lastName,
        ["email"]: Data._tokenResponse.email,
        ["username"]: Data._tokenResponse.firstName + Math.floor(num),
        ["password"]: password,
        ["profile"]: Data._tokenResponse.photoUrl
      })
      dialogRef.current.showModal();
    })
      .catch((err) => {
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
      })
  }
  return (
    <LazyLoadComponent placeholder={<Loader />} threshold={100}>
      <div className='flex flex-col md:flex-row h-screen'>
        {/* section-1 */}
        <div className='rounded-xl h-[300px] md:h-auto m-3 flex-1 bg-img1 text-white flex flex-col justify-between items-center py-5'>
          <div className='font-itim-regular text-3xl md:text-7xl'>Socially</div>
          <div className='font-oswald text-lg md:text-3xl'>A new way to connect to the world</div>
        </div>
        {/* section-2 */}
        <div className='flex-1'>
          <div className='px-[5vw] h-full flex flex-col justify-center'>
            <div className='pb-8'>
              <h1 className='text-4xl'>Create an account</h1>
              <p>Already have an account? <Link to={'/login'} className='text-blue-500 hover:underline'>Login</Link> </p>
            </div>
            <SignupForm />

            {/* dialog tag to take the date-of-birth after google auth */}
            <dialog ref={dialogRef} className="rounded-lg p-6 w-full max-w-md md:max-w-lg bg-white dark:bg-gray-800 shadow-lg relative">
              <button onClick={closeDialog} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <FaTimes size={18} />
              </button>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Choose Your Date of Birth</h2>

              <div>
                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                <input
                  onChange={handleChange}
                  type="date"
                  id="dob"
                  min="1960-04-01"
                  max="2017-04-30"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={submitGoogleAuthData} type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Done
                </button>
              </div>
            </dialog>
            <p className='text-center'>or</p>

            {/* sign in with google button */}
            <span className='flex justify-center'>
              <button onClick={() => handleClick(provider1)} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                  <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Sign in with Google
              </button>
              {/* space for any other authentication */}
            </span>

          </div>
        </div>
      </div>

    </LazyLoadComponent>
  )
}

export default Signup