import React from 'react';
import './ErrorMessageBox.css';

const ErrorMessageBox = ({ message, onClose }) => {
  return (
    <div className="error-message-box">
      <div className="error-content">
        <span>{message}</span>
        <button onClick={onClose} className="close-button">X</button>
      </div>
    </div>
  );
};

export default ErrorMessageBox;
