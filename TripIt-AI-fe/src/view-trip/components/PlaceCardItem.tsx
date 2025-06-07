import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useCallback } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Star, MapPinned } from "lucide-react";

const placePhotoCache = new Map<string, string | null>();

function PlaceCardItem({ place }: any) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    console.log(photoUrl);
    

    const GetPlacePhoto = useCallback(async () => {
        const textQuery = place?.placeName;

        if (!textQuery) {
            console.warn("No place name found for item, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        // Check cache first
        if (placePhotoCache.has(textQuery)) {
            setPhotoUrl(placePhotoCache.get(textQuery)!);
            return;
        }

        try {
            const res = await GetPlaceDetails({ textQuery });

            const photoName = res?.data?.places?.[0]?.photos?.[3]?.name || res?.data?.places?.[0]?.photos?.[0]?.name;
            let fetchedPhotoUrl: string | null = null;

            if (photoName) {
                fetchedPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
            } else {
                console.warn("No suitable photo found for place:", textQuery);
            }

            setPhotoUrl(fetchedPhotoUrl);
            // Store in cache
            placePhotoCache.set(textQuery, fetchedPhotoUrl);
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
            placePhotoCache.set(textQuery, null); // Cache null to avoid retrying failed fetches
        }
    }, [place?.placeName]);

    useEffect(() => {
        if (place?.placeName) {
            GetPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [place, GetPlacePhoto]); // Add GetPlacePhoto to dependency array

    const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + place.placeName;

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer"> {/* Added rel="noopener noreferrer" for security */}
            <div className="border rounded-xl p-3 lg:p-4 mt-2 flex flex-col gap-5 hover:scale-103 transition-all hover:shadow-md cursor-pointer">
                <div className="flex gap-4 md:gap-6">
                    <img src={photoUrl || '/placeholder.jpg'}
                        alt={`Image of ${place.placeName}`}
                        className="w-[150px] h-[150px] rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-between flex-grow p-3">
                        <h2 className="font-bold text-lg">{place.placeName}</h2>
                        <p className="text-sm text-gray-500 line-clamp-2">{place.placeDetails}</p>
                        {place.ticketPricing && (
                            <h2 className="font-semibold">{place.ticketPricing}</h2>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-between px-2">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={i < place.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <Button size="sm" className="self-start flex items-center gap-1">
                        <MapPinned className="h-4 w-4" /> View on Map
                    </Button>
                </div>
            </div>
        </Link>
    )
}

export default memo(PlaceCardItem)

// This is the most impactful change for performance if PlaceCardItem is re-rendered frequently by its parent (e.g., PlacesToVisit). Wrapping the component with React.memo will prevent it from re-rendering unless its place prop actually changes.