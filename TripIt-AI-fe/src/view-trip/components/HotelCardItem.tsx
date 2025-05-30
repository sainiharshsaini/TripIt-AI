import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItem({ hotel }: any) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (hotel?.imageUrl) {
            setPhotoUrl(hotel.imageUrl);
        } else if (hotel?.hotelName) {
            GetHotelPhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [hotel]);

    const GetHotelPhoto = async () => {
        const textQuery = hotel?.hotelName;

        if (!textQuery) {
            console.warn("No hotel name found for item, cannot fetch photo via Places API.");
            setPhotoUrl(null);
            return;
        }

        try {
            const res = await GetPlaceDetails({ textQuery });

            const photoName = res?.data?.places?.[0]?.photos?.[3]?.name || res?.data?.places?.[0]?.photos?.[0]?.name

            if (photoName) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No suitable photo found for hotel:", textQuery);
                setPhotoUrl(null);
            }
        } catch (error) {
            console.error("Error fetching hotel photo:", error);
            setPhotoUrl(null);
        }

        // await GetPlaceDetails(data)
        //     .then((res) => {
        //         const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
        //         setPhotoUrl(imgUrl)
        //     })
    }

    const mapLink = `https://www.google.com/maps/search/?api=1&query=` + (hotel?.hotelName || '') + "," + (hotel?.hotelAddress || '');

    return (
        <Link to={mapLink} target="_blank" rel="noopener noreferrer">
            <div className="hover:scale-103 transition-all cursor-pointer rounded-xl shadow-sm overflow-hidden">
                <img src={photoUrl || '/placeholder.jpg'}
                    alt={`Image of ${hotel?.hotelName || 'hotel'}`}
                    className="rounded-t-xl h-[200px] w-full object-cover"
                />
                <div className="p-3 flex flex-col gap-1">
                    <h2 className="font-medium text-lg truncate">{hotel?.hotelName || 'Unknown Hotel'}</h2>
                    <h2 className="text-xs text-gray-500 line-clamp-1">📍 {hotel?.hotelAddress || 'No Address'}</h2>
                    <h2 className="text-sm font-semibold">💰 {hotel?.price || 'Price N/A'}</h2>
                    {hotel?.rating && (
                        <h2 className="text-sm text-gray-700">⭐ {hotel.rating}</h2>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem