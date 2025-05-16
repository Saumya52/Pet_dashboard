import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ));
    }

    let pageNumbers = [];
    if (currentPage <= 3) {
      pageNumbers = [...pages.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, '...', ...pages.slice(totalPages - 5)];
    } else {
      pageNumbers = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }

    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => onPageChange(Number(page))}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 rounded-md ${
          currentPage === 1
            ? 'text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;