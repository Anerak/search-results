"use client"
import React from "react";
import { v4 as uuid } from 'uuid';
import SortByBox from "@/app/ui/results/sort/SortByBox";
import Card from "@/app/ui/results/card/Card";
import { type SailingsProps } from "@/app/models/Sailing";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Paginator from "./pagination/Paginator";
import { modifySearchQuery, sortSailings } from "@/app/utils/utils";


export default function SearchResults({ sailings }: SailingsProps) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [sailingsState, setSailings] = React.useState(sailings ?? []);
    // Initializing the sailings state
    React.useEffect(() => {
        setSailings(sailings);
    }, [sailings]);

    const [sortingOption, setSortingOption] = React.useState(searchParams.get('sort') || '');
    const [sortingOrder, setSortingOrder] = React.useState(searchParams.get('order') || 'asc');

    // How many pages do we have?
    const pages = Math.max(1, Math.ceil(sailings.length / 10));
    const [page, setPage] = React.useState(Number(searchParams.get('page') || 1));

    // If we're limiting the page to 10 results, then we should get our index multiplying the current page by 10
    const calculatePageIndex = (n: number) => n * 10;
    // Okay, but what about the limit? As we don't want to go to sailings.length automatically.
    const calculateNextIndex = (n: number) => calculatePageIndex(n) + 10;

    // Listening for changes for the "page" or "sort" URL params.
    React.useEffect(() => {
        const paramsPage: number = Number(searchParams.get('page')) || 1;
        setPage(paramsPage);

        const paramsSort: string = searchParams.get('sort') || '';
        setSortingOption(paramsSort);

        const paramsSortOrder: string = searchParams.get('order') || 'asc';
        setSortingOrder(paramsSortOrder);
    }, [searchParams]);

    // Resetting the URL removes the rest of the filters
    const handleFiltersReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(pathName);
    }

    const updateSorting = (option: string, order: string) => sortSailings(sailingsState, option, order);

    React.useEffect(() => {
        setSailings(updateSorting(sortingOption, sortingOrder));
    }, [sortingOption, sortingOrder]);

    const handleSortingChanges = (key: string, value: string) => router.push(`${pathName}?${modifySearchQuery(searchParams, key, value)}`)

    return (<React.Fragment>
        <main className="flex-1 flex flex-col px-2 pb-4">
            <div className="flex flex-row justify-end items-center pt-2">
                <span className="font-semibold text-lg">Sort by</span>
                <SortByBox callback={handleSortingChanges} params={searchParams} />
            </div>
            <div className="flex flex-row items-center px-2 py-1">
                <span className="font-semibold text-lg">{sailingsState?.length ?? 0} trips found</span>
                <button className="border-2 rounded-md font-medium text-sm px-2 mx-3 shadow-lg" onClick={handleFiltersReset}>Reset filters</button>
            </div>
            <div className="flex flex-col px-2 pt-4 h-full overflow-y-auto gap-4 mb-4 pb-4">
                {
                    sailingsState &&
                    sailingsState.slice(calculatePageIndex(page - 1), calculateNextIndex(page - 1)).map(sailing => <Card sailing={sailing} key={uuid()} />)
                }
            </div>
            <Paginator pages={pages} setPage={setPage} />
        </main>
    </React.Fragment>);
}