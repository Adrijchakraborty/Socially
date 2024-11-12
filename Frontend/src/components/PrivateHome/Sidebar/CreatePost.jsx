import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false)
      console.log(response.data)

      toast.success("File Uploaded!", {
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
    } catch (err) {
      setLoading(false);
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
    }
  };


  const dialogRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleFileUpload = () => {
    fileRef.current.click();
  };

  return (
    <dialog ref={dialogRef} className="create-header h-[50vh] w-[400px] rounded-lg cursor-default relative">
      <h2 className="text-center text-lg">Create a post</h2>
      <div className="border-t border-gray-400"></div>

      <div className='flex flex-col justify-center items-center my-10 gap-4'>
        <h2>Drag and drop image or video</h2>
        {/* Button to trigger file input */}
        {file ?
          <button onClick={handleUpload}>upload</button>
          :
          <button onClick={handleFileUpload} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Upload from device</button>
        }
        {loading && <p>Loading...</p>}
        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept='image/*'
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Close button */}
      <div className="absolute top-0 right-0 text-xl cursor-pointer" onClick={onClose}>
        <RxCross1 />
      </div>
      <ToastContainer />
    </dialog>
  );
};

export default CreatePost;
