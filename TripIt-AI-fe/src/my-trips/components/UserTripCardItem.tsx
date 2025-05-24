import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, key }) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [trip])

    const GetPlacePhoto = async () => {
        const textQuery = trip?.userSelection?.location?.label;

        if (!textQuery) {
            console.warn("No location label found for trip, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        const data = { textQuery };

        try {
            const res = await GetPlaceDetails(data);

            if (res?.data?.places?.[0]?.photos?.[3]?.name) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No photo found at expected index for location:", textQuery);
                setPhotoUrl(null);
            }
            // await GetPlaceDetails(data)
            // .then((res) => {
            //     const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
            //     setPhotoUrl(imgUrl)
            // })
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
        }
    }

    return (
        <Link to={"/view-trip/" + trip.id}>
            <div className="hover:scale-105 transition-all">
                <img src={photoUrl || '/placeholder.jpg'} alt="User trip img" className="object-cover rounded-xl h-[220px]" />
                <div>
                    <h2 className="font-bold text-lg">
                        {trip?.userSelection?.location?.label}
                    </h2>
                    <h2 className="text-sm text-gray-500">{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem