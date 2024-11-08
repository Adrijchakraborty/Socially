import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { topics } from "./Topic"
import Header from './Header'
import { FaArrowRight } from "react-icons/fa";
import { GlobalContext } from '../../context/Context';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SelectTopics = () => {

  const { userInfo } = useContext(GlobalContext);

  const navigate = useNavigate()

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [allTopics, setallTopics] = useState([]);


  const handleToggleTopic = (index, topic) => {
    if (selectedTopics.includes(index)) {
      setSelectedTopics(selectedTopics.filter((i) => i !== index));
      setallTopics(allTopics.filter((item) => item !== topic));
    } else {
      setSelectedTopics([...selectedTopics, index]);
      setallTopics([...allTopics, topic]);
    }
  };

  const handleSubmit = () => {
    if (allTopics.length < 5) {
      return toast.error("You have to select atleast 5 topics !", {
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

    axios.put('/api/auth/update', {
      topics: allTopics,
      id: userInfo._id
    }).then((response) => {
      toast.success('Sign-up successful!..please log in', {
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
    navigate('/login')
    }).catch((err) => {
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


    <div className='w-[90%] md:w-[70%] mx-auto'>
      <Header />
      <div className='flex flex-wrap gap-3 justify-center my-5'>
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleToggleTopic(index, topic)}
            className={`rounded-full px-3 py-2 w-fit cursor-pointer transition-colors duration-200 ${selectedTopics.includes(index) ? 'bg-blue-300' : 'bg-slate-200'
              }`}
          >
            <p>
              {topic}{selectedTopics.includes(index) && '✔️'}
            </p>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <button onClick={handleSubmit} type="button" className="mt-5 flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <FaArrowRight /> </button>
      </div>
    </div>



  )
}

export default SelectTopics