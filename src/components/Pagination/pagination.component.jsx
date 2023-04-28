import React, { useState, useEffect } from "react";
import "./pagination.css";

const CustomPagination = ({ totalItems, currentPage ,onPaginationChange }) => {
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    pageSize: 5
  });
  const [pageOptions] = useState([5, 10, 20, 50, 100]);
  const totalPages = Math.ceil(totalItems / paginationData.pageSize);

  const handlePageChange = (page) => {
    setPaginationData({...paginationData, currentPage: page});
    onPaginationChange({...paginationData, currentPage: page});
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);

    const newTotalPages = Math.ceil(totalItems / newSize);
    const newCurrentPage = paginationData.currentPage > newTotalPages ? 1 : paginationData.currentPage;

    setPaginationData({pageSize: newSize, currentPage: newCurrentPage});
    onPaginationChange({pageSize: newSize, currentPage: newCurrentPage});
  };

  useEffect(() => {
    setPaginationData({...paginationData, ...{currentPage: currentPage}});
  }, [currentPage]);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              className={paginationData.currentPage === page ? "active" : ""}
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
          value={paginationData.pageSize}
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