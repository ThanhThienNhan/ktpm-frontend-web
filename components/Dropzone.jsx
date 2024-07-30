import React from "react";
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ field ,setFieldValue }) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64data = reader.result;  
      setFieldValue(() => base64data);
    };
  
    reader.readAsDataURL(file);     
  }, []); //[setFieldValue]

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
    <input {...getInputProps()} />
      {field === undefined &&
        <div className="dropzone-content">
          <div className="icon">🖼️</div>
          <p>Drop Image Here, Paste Or</p>
          <button type="button" className="select-button">Select</button>
        </div>}
      <img className='Image-display' id='DroppedImage' src={field}></img>
  </div>
  );
};

export default Dropzone;