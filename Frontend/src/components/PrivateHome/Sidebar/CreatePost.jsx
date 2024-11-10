import React, { useRef, useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';

const CreatePost = ({ isOpen, onClose }) => {
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
      
      <div>
        <h2>Drag and drop image or video</h2>
        {/* Button to trigger file input */}
        <button onClick={handleFileUpload} className="upload-button">
          Upload from device
        </button>
        {/* Hidden file input */}
        <input 
          ref={fileRef} 
          type="file" 
          className="hidden" 
          onChange={(e) => console.log(e.target.files)}
        />
      </div>

      {/* Close button */}
      <div className="absolute top-0 right-0 text-xl cursor-pointer" onClick={onClose}>
        <RxCross1 />
      </div>
    </dialog>
  );
};

export default CreatePost;
