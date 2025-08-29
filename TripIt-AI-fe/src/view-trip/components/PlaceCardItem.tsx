import { memo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getPlaceDetails, getPhotoRefUrl } from "@/service/GlobalApi";
import { Star, MapPinned } from "lucide-react";

interface Place {
    placeName: string;
    placeDetails?: string;
    ticketPricing?: string;
    rating?: number;
}

interface PlaceCardItemProps {
    place: Place;
}

const placePhotoCache = new Map<string, string | null>();

function PlaceCardItem({ place }: PlaceCardItemProps) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const getPlacePhoto = useCallback(async () => {
        const textQuery = place.placeName;

        if (!textQuery) {
            console.warn("No place name found for item, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        // Return cached photo if available
        if (placePhotoCache.has(textQuery)) {
            setPhotoUrl(placePhotoCache.get(textQuery)!);
            return;
        }

        try {
            const res = await getPlaceDetails({ textQuery });

            const photos = res?.data?.places?.[0]?.photos;
            const photoName = photos && photos.length > 3 ? photos[3].name : photos?.[0]?.name;

            let fetchedPhotoUrl: string | null = null;

            if (photoName) {
                fetchedPhotoUrl = getPhotoRefUrl(photoName);
            } else {
                console.warn("No suitable photo found for place:", textQuery);
            }

            setPhotoUrl(fetchedPhotoUrl);
            placePhotoCache.set(textQuery, fetchedPhotoUrl);
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
            placePhotoCache.set(textQuery, null); // Cache null to prevent retry spamming
        }
    }, [place.placeName]);

    useEffect(() => {
        if (place.placeName) {
            getPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [place.placeName, getPlacePhoto]);

    const mapQuery = encodeURIComponent(`${place.placeName}`);

    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Open map for ${place.placeName}`}>
            <div className="border rounded-xl p-3 lg:p-4 mt-2 flex flex-col gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <div className="flex gap-4 md:gap-6">
                    <img
                        src={photoUrl || "/placeholder.jpg"}
                        alt={`Image of ${place.placeName}`}
                        className="w-[150px] h-[150px] rounded-xl object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="flex flex-col justify-between flex-grow p-3">
                        <h2 className="font-bold text-lg truncate">{place.placeName}</h2>
                        <p className="text-sm text-gray-500 line-clamp-2">{place.placeDetails}</p>
                        {place.ticketPricing && <h2 className="font-semibold">💰 {place.ticketPricing}</h2>}
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-between px-2">
                    <div className="flex space-x-1" aria-label={`Rating: ${place.rating ?? 0} out of 5`}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                aria-hidden="true"
                                className={i < (place.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                        ))}
                    </div>
                    <Button size="sm" className="self-start flex items-center gap-1" aria-label="View on Map">
                        <MapPinned className="h-4 w-4" />
                        View on Map
                    </Button>
                </div>
            </div>
        </Link>
    );
}

export default memo(PlaceCardItem);
