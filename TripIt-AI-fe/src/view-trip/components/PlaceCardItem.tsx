import { Button } from "@/components/ui/button"
import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

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

        const data = { textQuery };

        try {
            const res = await GetPlaceDetails(data);

            if (res?.data?.places?.[0]?.photos?.[3]?.name) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
                setPhotoUrl(imgUrl);
            } else if (res?.data?.places?.[0]?.photos?.[0]?.name) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[0].name);
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

    const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + place.placeName;

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer"> {/* Added rel="noopener noreferrer" for security */}
            <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <img src={photoUrl || '/placeholder.jpg'}
                    alt={`Image of ${place.placeName}`}
                    className="w-[130px] h-[130px] rounded-xl object-cover" />
                <div className="flex flex-col justify-between flex-grow">
                    <h2 className="font-bold text-lg">{place.placeName}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2">{place.Details}</p>
                    {place.timeTravel && (
                        <h2 className="mt-2 text-gray-700">🕙 {place.timeTravel}</h2>
                    )}
                    <Button size="sm" className="mt-2 self-start flex items-center gap-1">
                        <FaMapLocation className="h-4 w-4" /> View on Map
                    </Button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem