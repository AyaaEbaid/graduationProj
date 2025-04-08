import { useTranslation } from "react-i18next";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const{t,i18n}=useTranslation()
  return (
      <div className="flex justify-center  mt-6 space-x-2">
        <button
          className={`px-4 py-2 border  rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("pagination.previous")}
        </button>
  
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? "bg-teal-600 text-white" : ""}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
  
        <button
          className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("pagination.next")}
        </button>
      </div>
    );
  }