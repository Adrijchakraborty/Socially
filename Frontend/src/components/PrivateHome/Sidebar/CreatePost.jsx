import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../../utils/Loader';
const LazyCreateNext = React.lazy(() => import("./CreatePostNext"))

const CreatePost = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [filePath,setFilePath] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = `https://${import.meta.env.VITE_API_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${filePath}`

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
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
      setLoading(false);
      // console.log(response.data);
      setFilePath(response.data.filePath.fullPath)
      setImagePreview(null);
      setFile(null);
      setNextPage(true);
      toast.success("Image Uploaded!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
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
      {nextPage ? 
      <React.Suspense fallback={<Loader />}> <LazyCreateNext urlItem={{url,filePath}}/></React.Suspense>
       :

        <div>
          <h2 className="text-center text-lg">Create a post</h2>
          <div className="border-t border-gray-400"></div>

          <div className='flex flex-col justify-center items-center my-10 gap-4'>
            <h2>Drag and drop image or video</h2>

            {file ? (
              <>
                <button onClick={handleUpload} className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
                  {loading ? "Uploading..." : "Upload"}
                </button>
                <button onClick={handleRemoveImage} className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5">
                  Remove Image
                </button>
              </>
            ) : (
              <button onClick={handleFileUpload} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Upload from device
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
            ) : file ? (
              <p>Loading image...</p>
            ) : (
              <p>No image selected</p>
            )}
          </div>


        </div>
      }
      <div className="absolute top-0 right-0 text-xl cursor-pointer" onClick={onClose}>
        <RxCross1 />
      </div>
      <ToastContainer />
    </dialog>
  );
};

export default CreatePost;
