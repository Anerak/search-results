"use client"

import React from "react";
import { modifySearchQuery } from "@/app/utils/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginatorProps = {
    pages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Paginator({ pages, setPage }: PaginatorProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentPage = Number(searchParams.get('page')) || 1;

    const updateSearchQuery = (page: number,) => {
        router.push(`${pathname}?${modifySearchQuery(searchParams, 'page', page.toString())}`);
    }

    const pagination = React.useMemo(() => {
        const baseArray = Array.from(Array(pages).keys());
        if (pages <= 5) return baseArray;

        // Where are we sitting right now?
        const pageIndex = baseArray.indexOf(currentPage - 1);

        // Always keep the first and last elements.
        const start = baseArray.slice(0, 1);
        const end = baseArray.slice(-1);

        // Tired of writing the same line over and over.
        const baseLength = baseArray.length;

        // Alright, this one took quite some time to figure it out.
        let middle = [];

        if (pageIndex === 0) {
            // Are we at the start? Then we need to add
            middle = baseArray.slice(pageIndex, pageIndex + 3);
        } else if (pageIndex === baseLength - 1) {
            // What if we are at the end? Then we need to substract
            middle = baseArray.slice(pageIndex - 3, pageIndex);
        } else {
            // If I'm going beyond any of the limit (0...baseLength - 1), then we need to stop AT the limit.
            let from = pageIndex - 2;
            if (from < 0) from = 0;
            let to = pageIndex + 2;
            if (to > baseLength) to = baseLength;
            // And we cut ourselves a good slice of pie!
            middle = baseArray.slice(from, to);
        }

        // Merge eveything into an array, sort it
        const pagesArray = [...start, ...middle, ...end].sort();
        // Remove duplicates and return an array
        return [...new Set(pagesArray)];
    }, [pages, currentPage]);

    const handlePageClick = (page: number) => {
        updateSearchQuery(page);
        setPage(page);
    }

    return (
        <div className="flex flex-row bg-gray-200 w-full max-w-screen-sm md:w-2/3 h-16 rounded-md justify-between select-none">
            {/* Previous Page */}
            <span
                className={`font-bold text-blue-600 text-xl select-none p-4 cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-default' : ''}`}
                onClick={() => currentPage > 1 && updateSearchQuery(currentPage - 1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <div className="flex flex-row w-full h-full justify-evenly items-center">
                {
                    pagination?.map((page) =>
                        <span className={`${page === currentPage - 1 ? 'bg-white rounded-full' : ''} h-10 px-4 content-center cursor-pointer`} key={uuid()} onClick={() => handlePageClick(page + 1)}>
                            {page + 1}
                        </span>)
                }
            </div>
            {/* Next Page */}
            <span
                className={`font-bold text-blue-600 text-xl select-none p-4 cursor-pointer ${currentPage === pages ? 'opacity-50 cursor-default' : ''}`}
                onClick={() => currentPage < pages && updateSearchQuery(currentPage + 1)}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
        </div>
    );
}