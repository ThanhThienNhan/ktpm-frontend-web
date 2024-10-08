import React from "react";
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ field, setFieldValue }) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    //setFieldValue(file); // Directly set the file object
    //console.log(acceptedFiles);

    const reader = new FileReader();
    
    reader.onloadend = () => {
      setFieldValue(reader.result); // Set the base64 string
    };
    
    reader.readAsDataURL(file); // Read the file as a data URL
    //console.log(acceptedFiles);
  }, [setFieldValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {field === undefined && (
        <div className="dropzone-content">
          <div className="icon">🖼️</div>
          <p>Drop Image Here, Paste Or</p>
          <button type="button" className="select-button">Select</button>
        </div>
      )}
      {field && (
        <img
          className="Image-display"
          id="DroppedImage"
          src={field} // Create a temporary URL to preview image
          alt="Uploaded"
        />
      )}
    </div>
  );
};

export default Dropzone;
