import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { topics } from "./Topic"
import Header from './Header'

const SelectTopics = () => {
  const [topicData, setTopicData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(false);
  const [count, setCount] = useState(0);
  const access = import.meta.env.VITE_API_ACCESS_KEY;

  console.log(selected)

  const fetchImages = async (topic) => {
    return axios
      .get(`https://pixabay.com/api/?key=${access}&q=${topic}&image_type=photo&per_page=3`)
      .then((response) => {
        const obj = {
          "topic": topic,
          "url": response.data.hits[0]?.largeImageURL
        }
        return obj;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const fetchSeveralImages = async () => {
    const newCount = count + 10;
    const imagePromises = topics.slice(count, newCount).map(fetchImages);
    const images = await Promise.all(imagePromises);

    setTopicData((prevData) => [...prevData, ...images]);
    setCount(newCount);
  };

  useEffect(() => {
    fetchSeveralImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchSeveralImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [count]);


  const handleClick = (topic) => {
      setSelected((prev)=>[...prev,topic]);


  }

  return (


    <div className='w-[90%] md:w-[70%] mx-auto'>
      <Header/>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 450: 2, 900: 3 }}
      >
        <Masonry>
          {topicData.map((image, index) => (
            <div key={index} className='relative'>
              <p className='bg-slate-400 w-fit absolute px-1 shadow-2xl'>{image?.topic}</p>
              <div className='overflow-hidden'>
                <img onClick={()=> handleClick(image?.topic)} src={image?.url} alt={image?.topic} className="w-full h-auto p-3 cursor-pointer" />
              </div>

            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>



  )
}

export default SelectTopics