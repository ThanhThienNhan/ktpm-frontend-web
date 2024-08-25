import React from "react";
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ field, setFieldValue }) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFieldValue(file); // Directly set the file object
  }, [setFieldValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const isFile = field instanceof File;
  const isString = typeof field === 'string';

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
      {isFile && (
        <img
          className="Image-display"
          id="DroppedImage"
          src={URL.createObjectURL(field)} // Create a temporary URL to preview image
          alt="Uploaded"
        />
      )}
      {isString && (
        <img
          className="Image-display"
          id="DroppedImage"
          src={field} // Directly use the URL for the image
          alt="Uploaded"
        />
      )}
    </div>
  );
};

export default Dropzone;
