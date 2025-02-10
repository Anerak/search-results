import React from "react";
import { v4 as uuid } from 'uuid';
import SortByBox from "@/app/ui/results/sort/SortByBox";
import Card from "@/app/ui/results/card/Card";
import { type Sailing, type SailingsProps } from "@/app/models/Sailing";
//import { getSailings } from "@/app/data/sailings";


export default function SearchResults(props: SailingsProps) {
    const sailings: Sailing[] = props.sailings;
    return (<React.Fragment>
        <main className="flex-1 flex flex-col">
            <div className="flex flex-row justify-end items-center pt-2 px-2">
                <span className="font-semibold text-lg">Sort by</span>
                <SortByBox />
            </div>
            <div className="flex flex-row items-center px-4">
                <span className="font-semibold text-lg">{sailings?.length ?? 0} trips found</span>
                <button className="border-2 rounded-md font-medium text-sm px-2 mx-3 shadow-lg">Reset filters</button>
            </div>
            <div className="flex flex-col px-2 pt-4 h-full overflow-y-auto gap-4 pl-4">
                {
                    sailings &&
                    sailings.map(sailing => <Card sailing={sailing} key={uuid()} />)
                }
            </div>
        </main>
    </React.Fragment>);
}