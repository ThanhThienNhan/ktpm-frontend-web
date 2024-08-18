import React from "react";
import "./BrandPagination.css";

const BrandPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleChange = (event) => {
    onPageChange(Number(event.target.value));
  };

  return (
    <div className="pagination-container">
      <span>Page </span>
      <select value={currentPage} onChange={handleChange}>
        {Array.from({ length: totalPages }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <span>of</span>
      <span>{totalPages}</span>
    </div>
  );
};

export default BrandPagination;
