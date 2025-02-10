import { getSailings } from "@/app/data/sailings";
import SearchResults from "@/app/ui/results/SearchResults";
import Sidebar from "@/app/ui/sidebar/Sidebar";
import React from "react";

export default async function Search() {
    const sailings = await getSailings('https://sandbox.cruisebound-qa.com/sailings');

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <Sidebar />
            <SearchResults sailings={sailings} />
        </div>
    );
}
