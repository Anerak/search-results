import React from "react";
import Image from "next/image";
import CardDetails from "@/app/ui/results/card/details/CardDetails";
import { SailingProps } from "@/app/models/Sailing";
import { getShortDateFormat } from "@/app/utils/utils";

export default function Card(props: SailingProps) {
    const sailing = props.sailing;
    return (<React.Fragment>
        <div className="flex flex-col md:flex-row w-full shadow-md rounded-2xl md:min-h-72">
            <div className="md:w-1/4 w-full h-full overflow-hidden rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl relative">
                <span className="absolute top-2 left-2 p-2 text-background bg-opacity-65 bg-gray-950 rounded-md">{getShortDateFormat(sailing.departureDate, sailing.returnDate)}</span>
                <Image src={sailing.ship.image ?? '/missing.svg'} className="h-full w-full" alt={`${sailing.ship.name} ship`} width={512} height={512} placeholder="empty" />
            </div>
            <CardDetails sailing={sailing} />
        </div>
    </React.Fragment>);
}