import { useTranslation } from "react-i18next";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation();

  const siblingCount = 2;
  const range = [];

  let startPage = Math.max(1, currentPage - siblingCount);
  let endPage = Math.min(totalPages, currentPage + siblingCount);

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  const showLeftDots = startPage > 2;
  const showRightDots = endPage < totalPages - 1;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("pagination.previous")}
      </button>

      {showLeftDots && (
        <>
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {startPage > 3 && <span className="px-4 py-2">...</span>}
        </>
      )}

      {range.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 border rounded-md ${
            currentPage === page ? "bg-teal-600 text-white" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {showRightDots && (
        <>
          {endPage < totalPages - 2 && <span className="px-4 py-2">...</span>}
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("pagination.next")}
      </button>
    </div>
  );
}