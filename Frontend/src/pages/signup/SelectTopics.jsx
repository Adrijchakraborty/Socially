import React, { useState, useEffect, useRef } from 'react';

const topics = [
  "Cooking",
  "Vlogging",
  "Traveling",
  "Photography",
  "Gardening",
  "DIY Projects",
  "Fitness & Exercise",
  "Yoga & Meditation",
  "Tech Gadgets",
  "Gaming",
  "Coding & Programming",
  "Health & Wellness",
  "Fashion & Styling",
  "Beauty & Skincare",
  "Interior Design",
  "Automobiles",
  "Pet Care",
  "Finance & Investing",
  "Productivity Hacks",
  "Book Recommendations",
  "Home Improvement",
  "Digital Art",
  "Self-Development",
  "Podcasting",
  "Music",
  "Movie Reviews",
  "Outdoor Adventures",
  "Science Experiments",
  "Language Learning",
  "Writing & Blogging"
];

const SelectTopics = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();

  // Function to fetch images from Unsplash API for each topic
  const fetchImages = async (topic, page = 1) => {
    const accessKey = import.meta.env.VITE_API_ACCESS_KEY; // Replace with your Unsplash API key
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${topic}&page=${page}&per_page=1&client_id=${accessKey}`
    );
    const data = await response.json();
    return data.results[0]?.urls?.regular; // Get the URL of the image
  };

  // Function to load images for all topics
  const loadImages = async () => {
    setLoading(true);
    const newImages = await Promise.all(
      topics.map(async (topic) => {
        const imageUrl = await fetchImages(topic, page);
        return { topic, imageUrl };
      })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
    setLoading(false);
  };

  // Infinite scroll handler using IntersectionObserver
  const lastImageElementRef = useRef(null);
  useEffect(() => {
    if (loading) return; // Don't trigger if already loading images

    const options = {
      root: null, // observing relative to the viewport
      rootMargin: '0px',
      threshold: 1.0, // Trigger when 100% of the target is in the viewport
    };

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observerInstance = new IntersectionObserver(callback, options);
    if (lastImageElementRef.current) {
      observerInstance.observe(lastImageElementRef.current);
    }

    return () => observerInstance.disconnect(); // Cleanup the observer
  }, [loading]);

  // Load images when page changes (initial load or scroll)
  useEffect(() => {
    loadImages();
  }, [page]);

  return (
    <div>
      <h1>Unsplash Images</h1>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <h3>{image.topic}</h3>
            <img src={image.imageUrl} alt={image.topic} />
          </div>
        ))}
      </div>
      {loading && <p>Loading more images...</p>}
      {/* This div is used to trigger the infinite scroll */}
      <div ref={lastImageElementRef}></div>
    </div>
  );
};

export default SelectTopics;
