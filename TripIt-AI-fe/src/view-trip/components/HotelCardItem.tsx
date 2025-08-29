import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getPlaceDetails, getPhotoRefUrl } from "@/service/GlobalApi";

interface Hotel {
    hotelName?: string;
    hotelAddress?: string;
    imageUrl?: string;
    price?: string;
    rating?: number;
    [key: string]: any;
}

interface HotelCardItemProps {
    hotel: Hotel;
}

const placePhotoCache = new Map<string, string | null>();

function HotelCardItem({ hotel }: HotelCardItemProps) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const getHotelPhoto = useCallback(async () => {
        const textQuery = hotel?.hotelName;

        if (!textQuery) {
            console.warn("No hotel name found for item, cannot fetch photo via Places API.");
            setPhotoUrl(null);
            return;
        }

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
                console.warn("No suitable photo found for hotel:", textQuery);
            }

            setPhotoUrl(fetchedPhotoUrl);
            placePhotoCache.set(textQuery, fetchedPhotoUrl);
        } catch (error) {
            console.error("Error fetching hotel photo:", error);
            setPhotoUrl(null);
            placePhotoCache.set(textQuery, null);
        }
    }, [hotel]);

    useEffect(() => {
        if (hotel?.imageUrl) {
            setPhotoUrl(hotel.imageUrl);
        } else if (hotel?.hotelName) {
            getHotelPhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [hotel, getHotelPhoto]);

    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${hotel?.hotelName || ""}, ${hotel?.hotelAddress || ""}`
    )}`;

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Open map for ${hotel?.hotelName || "hotel"}`}>
            <div className="hover:scale-105 transition-all cursor-pointer rounded-xl shadow-sm hover:shadow-md overflow-hidden">
                <img
                    src={photoUrl || "/placeholder.jpg"}
                    alt={`Image of ${hotel?.hotelName || "hotel"}`}
                    className="rounded-t-xl h-[200px] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="p-3 flex flex-col gap-1">
                    <h2 className="font-medium text-lg truncate">{hotel?.hotelName || "Unknown Hotel"}</h2>
                    <p className="text-xs text-gray-500 line-clamp-1">📍 {hotel?.hotelAddress || "No Address"}</p>
                    <p className="text-sm font-semibold">💰 {hotel?.price || "Price N/A"}</p>
                    {hotel?.rating !== undefined && (
                        <p className="text-sm text-gray-700">⭐ {hotel.rating}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
