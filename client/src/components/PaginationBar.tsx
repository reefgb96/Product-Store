import React from 'react';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 p-4">
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-transparent border-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'<<'}
      </button>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-transparent border-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'<'}
      </button>
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-transparent border-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'>'}
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-transparent border-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'>>'}
      </button>
    </div>
  );
};

export default PaginationBar;
