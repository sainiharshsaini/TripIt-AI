import HotelCardItem from "./HotelCardItem"

function Hotels({ trip }: any) {

    if (!trip || !trip.tripData || !trip.tripData.travelPlan || !trip.tripData.travelPlan.hotels || trip.tripData.travelPlan.hotels.length === 0) {
        // You can return a loading state, a message, or null/empty div
        return (
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
                <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
                <p className="text-gray-500 text-center">No hotel recommendations available for this trip yet.</p>
            </div>
        );
    }

    return (
        <div className="mt-10 md:p-5 bg-white md:rounded-lg md:shadow-sm">
            <h2 className="font-bold text-xl mb-4">Hotel Recommendation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {trip.tripData.travelPlan.hotels.map((hotel: any, index: number) => (
                    <HotelCardItem hotel={hotel} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Hotels