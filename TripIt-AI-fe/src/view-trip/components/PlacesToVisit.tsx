import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({ trip }) {
    
    return (
        <div>
            <h2 className="font-bold text-lg">Places to visit</h2>

            <div>
                {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
                    <div key={index} className="mt-5">
                        <h2 className="font-medium text-lg">Day {item?.day}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.plan.map((place, index2) => (
                                <div key={index2}>
                                    <h2 className="font-medium text-sm text-orange-600">{place.timeTravel}</h2>
                                    <PlaceCardItem place={place} index={index2}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit