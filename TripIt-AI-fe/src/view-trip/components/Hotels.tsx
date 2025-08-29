import HotelCardItem from "./HotelCardItem";
import type { Hotel, TravelPlan } from "@/lib/types";

interface HotelsProps {
    trip?: TravelPlan | null;
}

function Hotels({ trip }: HotelsProps) {
    const hotels: Hotel[] = trip?.travelPlan?.hotels ?? [];

    if (!hotels.length) {
        return (
            <section className="mt-8 p-4 bg-white rounded-lg shadow-sm" aria-label="Hotel Recommendations">
                <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
                <p className="text-gray-500 text-center">No hotel recommendations available for this trip yet.</p>
            </section>
        );
    }

    return (
        <section className="mt-10 md:p-5 bg-white md:rounded-lg md:shadow-sm" aria-label="Hotel Recommendations">
            <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {hotels.map((hotel) => {
                    const key = hotel.id ?? hotel.hotelName ?? Math.random().toString();
                    return <HotelCardItem hotel={hotel} key={key} />;
                })}
            </div>
        </section>
    );
}

export default Hotels;
