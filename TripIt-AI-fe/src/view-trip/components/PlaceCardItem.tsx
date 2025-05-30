import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Star, Clock, MapPinned } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function PlaceCardItem({ place }: any) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (place?.placeName) {
            GetPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [place]);

    const GetPlacePhoto = async () => {
        const textQuery = place?.placeName;

        if (!textQuery) {
            console.warn("No place name found for item, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        try {
            const res = await GetPlaceDetails({ textQuery });

            const photoName = res?.data?.places?.[0]?.photos?.[3]?.name || res?.data?.places?.[0]?.photos?.[0]?.name;

            if (photoName) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No suitable photo found for place:", textQuery);
                setPhotoUrl(null);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
        }

        // await GetPlaceDetails(data)
        //     .then(res => {
        //         const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
        //         setPhotoUrl(imgUrl)
        //     })
    }

    const rating = 4
    const maxRating = 5;
    const stars = Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        if (rating >= starValue) {
            return <FaStar key={index} />;
        } else if (rating > starValue - 1 && rating < starValue) {
            return <FaStarHalfAlt key={index} />;
        } else {
            return <FaRegStar key={index} />;
        }
    }

    const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + place.placeName;

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer"> {/* Added rel="noopener noreferrer" for security */}
            <div className="border rounded-xl p-3 lg:p-4 mt-2 flex flex-col gap-5 hover:scale-103 transition-all hover:shadow-md cursor-pointer">
                <div className="flex gap-4 md:gap-6">
                    <img src={photoUrl || '/placeholder.jpg'}
                        alt={`Image of ${place.placeName}`}
                        className="w-[150px] h-[150px] rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                        <h2 className="font-bold text-lg">{place.placeName}</h2>
                        <p className="text-sm text-gray-500 line-clamp-2">{place.placeDetails}</p>
                        {place.timeToTravel && (
                            <h2 className="flex items-center gap-1 mt-3 text-gray-700">
                                <Clock size={16} />
                                {place.timeToTravel}
                            </h2>
                        )}
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

export default PlaceCardItem