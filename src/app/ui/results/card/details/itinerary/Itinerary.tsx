import { shortItinerary } from "@/app/utils/utils";
import React from "react";
import { v4 as uuid } from "uuid";

type ItineraryProps = {
    itinerary: string[],
};


export default function Itinerary(props: ItineraryProps) {
    const itinerary = shortItinerary(props.itinerary);

    return (<React.Fragment>
        {itinerary.map((port, index) => (<React.Fragment key={uuid()}>
            {!!index && <span className="text-blue-500">→</span>}
            <span>{port}</span>
        </React.Fragment>))}
    </React.Fragment>);
}