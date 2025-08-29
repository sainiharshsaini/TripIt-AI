import { useState, useEffect } from "react";
import { getPlaceDetails, getPhotoRefUrl } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

interface Trip {
    id: string;
    userSelection: {
        location: {
            label: string;
        };
        noOfDays: number;
        budget: string;
    };
}

interface UserTripCardItemProps {
    trip: Trip;
    key?: React.Key;
}

function UserTripCardItem({ trip }: UserTripCardItemProps) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            getPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip.userSelection.location.label]); // More specific dependency avoids unnecessary calls

    const getPlacePhoto = async () => {
        const textQuery = trip.userSelection.location.label;

        if (!textQuery) {
            console.warn("No location label found for trip, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        try {
            const res = await getPlaceDetails({ textQuery });

            // Defensive: check if photos array exists and has at least 4 items
            const photoName =
                res?.places?.[0]?.photos && res.places[0].photos.length > 3
                    ? res.places[0].photos[3].name
                    : null;

            if (photoName) {
                const imgUrl = getPhotoRefUrl(photoName);
                setPhotoUrl(imgUrl);
            } else if (res?.places?.[0]?.photos && res.places[0].photos.length > 0) {
                // fallback to first photo if 4th index doesn't exist
                const fallbackPhotoName = res.places[0].photos[0].name;
                const imgUrl = getPhotoRefUrl(fallbackPhotoName);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No photo found for location:", textQuery);
                setPhotoUrl(null);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
        }
    };

    return (
        <Link
            to={`/view-trip/${trip.id}`}
            className="block hover:scale-105 transition-all duration-300"
            aria-label={`View trip details for ${trip.userSelection.location.label}`}
        >
            <div className="rounded-xl overflow-hidden shadow-sm">
                <img
                    src={photoUrl || "/placeholder.jpg"}
                    alt={`Image for ${trip.userSelection.location.label || "trip"}`}
                    className="object-cover w-full h-[220px]"
                    loading="lazy"
                    decoding="async"
                />
                <div className="p-3">
                    <h2 className="font-bold text-lg truncate">
                        {trip.userSelection.location.label || "Unknown Location"}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        {trip.userSelection.noOfDays} Days trip with {trip.userSelection.budget} Budget
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;
