import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex justify-center items-center mt-4 ${
        isArabic ? "space-x-reverse space-x-2" : "space-x-2"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* زر السابق */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition ${
          isArabic ? "ms-2" : "me-2"
        }`}
      >
        {t("pag.previous")}
      </button>

      {/* الأرقام */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          {page}
        </button>
      ))}

      {/* زر التالي */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
      >
        {t("pag.next")}
      </button>
    </div>
  );
};

export default Pagination;