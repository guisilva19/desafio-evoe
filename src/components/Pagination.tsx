import { Dispatch, SetStateAction } from "react";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`px-3 py-1 mx-0.5 rounded ${
          currentPage === i
            ? "bg-gray-200 text-gray-700"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        {i}
      </button>
    );
  }

  return pages;
}

export default Pagination;
