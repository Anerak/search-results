import React from "react";
import SortByBox from "./sort/SortByBox";

export default function SearchResults() {
    return (<React.Fragment>
        <main className="flex-1 flex flex-col p-2">
            <div className="flex flex-row justify-end items-center">
                <span className="font-semibold text-xl">Sort by</span>
                <SortByBox />
            </div>
            <div className="flex flex-row items-center">
                <span className="font-semibold text-xl">24 trips found</span>
                <button className="border-2 rounded-md font-semibold text-lg px-2 mx-4 shadow-lg">Reset filters</button>
            </div>
            <div className="flex flex-col px-2">
                <div className="flex flex-row w-full">
                    <img src="https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1656397931/production/small_msc_vi_item_76c6c4b53c.png" alt="Cruise" />
                </div>
            </div>
        </main>
    </React.Fragment>);
}