"use client"
import React from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { modifySearchQuery } from "@/app/utils/utils";


export default function Filters() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [departurePort, setDeparturePort] = React.useState(searchParams.get('departurePort') ?? '');
    const [departureDate, setDepartureDate] = React.useState(searchParams.get('departureDate') ?? '');
    const [shipCruiseline, setShipCruiseline] = React.useState(searchParams.get('shipCruiseline') ?? '');

    // What happens if we use the "Reset filters" magic button? Well, we need to listen for changes
    // And reset the inputs.
    React.useEffect(() => {
        setDeparturePort(searchParams.get('departurePort') ?? '');
        setDepartureDate(searchParams.get('departureDate') ?? '');
        setShipCruiseline(searchParams.get('shipCruiseline') ?? '');
    }, [searchParams]);

    const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setDeparturePort(value ?? '');
        router.push(`${pathname}?${createSearchQuery(searchParams, 'departurePort', value)}`)
    }

    const handleShipCruiselineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setShipCruiseline(value ?? '');
        router.push(`${pathname}?${createSearchQuery(searchParams, 'shipCruiseline', value)}`)
    }

    const handleDepartureDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let { value } = event.target;
        // Now, this is interesting. Taking the user timezone might require extra coding, but let's keep it simple.
        if (value) {
            // Working with dates feels like handling magic.
            const depDate = new Date(`${value} 00:00:01`);
            const day: number = depDate.getDate();
            const parsedDay: string = day < 10 ? `0${day}` : day.toString();
            const month = depDate.getMonth() + 1;
            const parsedMonth: string = month < 10 ? `0${month}` : month.toString();
            const year = depDate.getFullYear();

            value = `${year}-${parsedMonth}-${parsedDay}`;
        }
        setDepartureDate(value ?? '');
        router.push(`${pathname}?${createSearchQuery(searchParams, 'departureDate', value)}`)
    }


    const createSearchQuery = React.useCallback(modifySearchQuery, [searchParams]);

    return (<React.Fragment>
        <div className="w-3/4 md:w-full md:h-full">
            <div className="flex flex-col md:p-4 w-full">
                <label htmlFor="port" className="text-gray-300 text-xl mb-2 select-none">Departure Port</label>
                <input type="text" id="departurePort" className="rounded-[4] p-2 text-xl text-slate-800 placeholder:text-slate-400" placeholder="Any port" onChange={handlePortChange} value={departurePort} />
            </div>
            <div className="flex flex-col md:p-4 w-full">
                <label htmlFor="cruiseline" className="text-gray-300 text-xl mb-2 select-none">Cruiseline</label>
                <input type="text" id="cruiseline" className="rounded-[4] p-2 text-xl text-slate-800 placeholder:text-slate-400" placeholder="Any ship" onChange={handleShipCruiselineChange} value={shipCruiseline} />
            </div>
            <div className="flex flex-col md:p-4 w-full">
                <label htmlFor="cruiseline" className="text-gray-300 text-xl mb-2 select-none">Departure Date</label>
                <input type="date" id="departureDate" className="rounded-[4] p-2 text-xl text-slate-800 placeholder:text-slate-400" placeholder="Any ship" onChange={handleDepartureDateChange} value={departureDate} />
            </div>
        </div>
    </React.Fragment>);
}