import React from "react";
import Image from "next/image";
import { Sailing, SailingProps } from "@/app/models/Sailing";
import Itinerary from "@/app/ui/results/card/details/itinerary/Itinerary";

export default function CardDetails(props: SailingProps) {
    const sailing: Sailing = props.sailing;

    return (<React.Fragment>
        <div className="flex flex-col w-full md:w-3/4 justify-between">
            <div className="flex flex-row px-2 justify-between">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold p-2 pt-4">{sailing.name}</span>
                    <div className="flex flex-row px-2 gap-3 text-lg">
                        <div>
                            <span>{sailing.region}</span>
                        </div>
                        <div>
                            <span>{sailing.duration} nights</span>
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <span className="text-black">⭐ {sailing.ship.rating}</span>
                            <span className="text-gray-500 text-sm">{sailing.ship.reviews} reviews</span>
                        </div>
                    </div>
                    <div className="flex flex-row p-1 gap-1 flex-wrap">
                        <Itinerary itinerary={sailing.itinerary} />
                    </div>
                </div>
                <div className="flex flex-col items-end pr-4">
                    <Image src={sailing.ship.line.logo ?? '/missing.svg'} alt={`${sailing.ship.line.name} logo`} width={128} height={1} className="max-h-[96px]" />
                    <span className="text-gray-400 text-sm">{sailing.ship.name}</span>
                </div>
            </div>
            <div className="w-full h-1/3 bg-gray-100 rounded-br-xl flex flex-row items-center justify-end pr-4">
                <div className="flex flex-col p-2">
                    <span>Interior from</span>
                    <div className="flex flex-row items-start justify-end">
                        <span>&#36;</span>
                        <span className="text-2xl font-semibold">{sailing.price}</span>
                    </div>
                </div>
                <button className="bg-[--bg-btn-sailings] text-white font-bold p-3 rounded-md">See Sailings</button>
            </div>
        </div>
    </React.Fragment>);
}