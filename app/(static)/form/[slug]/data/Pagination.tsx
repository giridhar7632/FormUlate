"use client";

import { ChevronLeft, ChevronRight } from "@/lib/icons";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

type PaginationProps = {
  slug: string;
  totalPages: number;
  currPage: number;
};

export const Pagination = ({ slug, totalPages, currPage }: PaginationProps) => {
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <PageButton
            key={number}
            link={`/form/${slug}/data?page=${number}`}
            active={number === currPage}
          >
            {number}
          </PageButton>
        ),
      );
    } else {
      const startPage = Math.max(1, currPage - 1);
      const endPage = Math.min(totalPages, currPage + 1);

      const pages = [];
      if (startPage > 1) {
        pages.push(
          <PageButton
            key={1}
            link={`/form/${slug}/data?page=${1}`}
            active={currPage === 1}
          >
            {1}
          </PageButton>,
        );
        pages.push(
          <button className="py-2 text-sm font-medium text-gray-700">
            ...
          </button>,
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PageButton
            link={`/form/${slug}/data?page=${i}`}
            active={i === currPage}
            key={i}
          >
            {i}
          </PageButton>,
        );
      }

      if (endPage < totalPages && endPage !== totalPages - 1) {
        pages.push(
          <button className="py-2 text-sm font-medium text-gray-700">
            ...
          </button>,
        );
      }

      if (endPage !== totalPages) {
        pages.push(
          <PageButton link={`/form/${slug}/data?page=${totalPages}`}>
            {totalPages}
          </PageButton>,
        );
      }

      return pages;
    }
  };

  return (
    <nav className="flex items-center justify-center gap-2">
      <PageButton
        key={"prev"}
        link={`/form/${slug}/data?page=${currPage - 1}`}
        disabled={currPage === 1}
      >
        <ChevronLeft width={18} />
        <span className="hidden md:block">Previous</span>
      </PageButton>

      {renderPageNumbers()}

      <PageButton
        key={"next"}
        link={`/form/${slug}/data?page=${currPage + 1}`}
        disabled={totalPages === currPage}
      >
        <span className="hidden md:block">Next</span>
        <ChevronRight width={18} />
      </PageButton>
    </nav>
  );
};

const PageButton = ({
  link,
  children,
  active,
  disabled,
}: {
  link: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Link
      href={link}
      className={clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300 h-8 px-3 py-2 gap-2 pr-2.5",
        active &&
          "ring bg-gray-100 dark:bg-gray-800 ring-gray-200 dark:ring-gray-700 min-w-8 h-8 text-gray-900 dark:text-gray-100",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      {children}
    </Link>
  );
};
