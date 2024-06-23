import React from "react";

export type PaginationButtonsProps = {
  pageCount: number;
  currentPage: number;
  onClick: (event: React.SyntheticEvent) => void;
};

export function PaginationButtons({
  pageCount,
  currentPage,
  onClick,
}: PaginationButtonsProps) {
  const maxVisibleButtons = 3; // Number of visible buttons on each side of the current button

  // Function to generate the list of visible pages based on the current page
  const generatePageList = () => {
    let start = currentPage - maxVisibleButtons;
    let end = currentPage + maxVisibleButtons;

    if (start < 1) {
      start = 1;
      end = Math.min(pageCount, start + maxVisibleButtons * 2);
    }

    if (end > pageCount) {
      end = pageCount;
      start = Math.max(1, end - maxVisibleButtons * 2);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pageList = generatePageList();

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full justify-center">
      {pageList.map((page) => (
        <button
          key={page}
          className={
            currentPage === page
              ? "bg-blue-500 rounded-xl text-white px-2 py-1 page"
              : "rounded-xl bg-white px-2 py-1 hover:bg-blue-700 hover:text-white page"
          }
          onClick={onClick}
          value={page}
        >
          {page.toString()}
        </button>
      ))}
    </div>
  );
}
