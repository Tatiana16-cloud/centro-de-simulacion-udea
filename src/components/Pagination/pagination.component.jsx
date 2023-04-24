import React, { useState, useEffect } from "react";
import "./pagination.css";

const CustomPagination = ({ totalItems, onPaginationChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageOptions] = useState([5, 10, 20, 50, 100]);
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPaginationChange(page, pageSize);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);

    const newTotalPages = Math.ceil(totalItems / newSize);
    const newCurrentPage = currentPage > newTotalPages ? 1 : currentPage;
    setCurrentPage(newCurrentPage);
    onPaginationChange(newCurrentPage, newSize);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <div className="page-size-select">
        <label htmlFor="page-size">Items por página: </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomPagination;