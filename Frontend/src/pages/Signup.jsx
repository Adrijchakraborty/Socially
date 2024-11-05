import React from 'react'
import SignupForm from './signup/SignupForm'
import { Link } from 'react-router-dom'


const Signup = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* section-1 */}
      <div className='rounded-xl m-3 flex-1 bg-img text-white flex flex-col justify-between items-center py-5'>
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
          <p className='text-center'>or</p>

          {/* sign in with google button */}
          <span className='flex justify-center'>
            <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
              </svg>
              Sign in with Google
            </button>
          </span>

        </div>
      </div>
    </div>
  )
}

export default Signup