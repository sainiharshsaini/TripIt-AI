import { memo } from "react";
import PlaceCardItem from "./PlaceCardItem";
import type { TripData, ItineraryDay, Place } from "@/lib/types";

interface PlacesToVisitProps {
    trip?: TripData | null;
}

function PlacesToVisit({ trip }: PlacesToVisitProps) {
    const itinerary: ItineraryDay[] = trip?.tripData.travelPlan?.itinerary ?? [];

    if (itinerary.length === 0) {
        return (
            <section
                className="mt-10 p-5 bg-white rounded-lg shadow-sm"
                aria-label="Places to Visit"
            >
                <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
                <p className="text-gray-500 text-center">
                    No detailed itinerary available for this trip yet.
                </p>
            </section>
        );
    }

    return (
        <section
            className="mt-10 md:p-5 bg-white md:rounded-lg md:shadow-sm"
            aria-label="Places to Visit"
        >
            <h2 className="font-bold text-lg mb-4">Places to visit</h2>

            <div>
                {itinerary.map((item, idx) => (
                    <div
                        key={item.day ?? idx}
                        className="mt-5 border-b pb-4 last:border-b-0"
                        aria-label={`Day ${item.day}`}
                    >
                        <h2 className="font-medium text-xl mb-3 text-primary-500">{item.day}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.plan.map((place: Place, index2) => (
                                <div key={index2} className="flex flex-col">
                                    {place.timeTravel && (
                                        <h3 className="font-medium text-sm text-orange-600 mb-1">
                                            {place.timeTravel}
                                        </h3>
                                    )}
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default memo(PlacesToVisit);
