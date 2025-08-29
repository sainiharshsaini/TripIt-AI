import HotelCardItem from "./HotelCardItem";

interface Hotel {
    id?: string | number;
    [key: string]: any; // Adjust this to concrete hotel properties if known
}

interface Trip {
    tripData?: {
        travelPlan?: {
            hotels?: Hotel[];
        };
    };
}

interface HotelsProps {
    trip?: Trip | null;
}

function Hotels({ trip }: HotelsProps) {
    const hotels = trip?.tripData?.travelPlan?.hotels ?? [];

    if (!hotels.length) {
        return (
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
                <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
                <p className="text-gray-500 text-center">No hotel recommendations available for this trip yet.</p>
            </div>
        );
    }

    return (
        <section className="mt-10 md:p-5 bg-white md:rounded-lg md:shadow-sm" aria-label="Hotel Recommendations">
            <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {hotels.map((hotel, index) => {
                    const key = hotel.id ?? index; // Prefer unique id key if available
                    return <HotelCardItem hotel={hotel} key={key} />;
                })}
            </div>
        </section>
    );
}

export default Hotels;
