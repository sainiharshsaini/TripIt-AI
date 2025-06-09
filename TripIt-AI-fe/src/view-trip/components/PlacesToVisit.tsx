import { memo } from "react";
import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({ trip }: any) {

    if (!trip || !trip.tripData || !trip.tripData.travelPlan || !trip.tripData.travelPlan.itinerary) {
        // You can return a loading state, a message, or null/empty div
        return (
            <div className="mt-10 p-5 bg-white rounded-lg shadow-sm">
                <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
                <p className="text-gray-500 text-center">No detailed itinerary available for this trip yet.</p>
            </div>
        );
    }

    return (
        <div className="mt-10 md:p-5 bg-white md:rounded-lg md:shadow-sm">
            <h2 className="font-bold text-lg mb-4">Places to visit</h2>

            <div>
                {trip?.tripData.travelPlan.itinerary.map((item: any, index: number) => (
                    <div key={index} className="mt-5 border-b pb-4 last:border-b-0">
                        <h2 className="font-medium text-xl mb-3 text-primary-500">{item?.day}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.plan.map((place: any, index2: number) => (
                                <div key={index2} className="flex flex-col">
                                    {place.timeTravel && (
                                        <h2 className="font-medium text-sm text-orange-600 mb-1">
                                            {place.timeTravel}
                                        </h2>
                                    )}
                                    <PlaceCardItem place={place} key={index2} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(PlacesToVisit)