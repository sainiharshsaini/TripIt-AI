import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip, index }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (trip) GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }

        await GetPlaceDetails(data)
            .then((res) => {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
                setPhotoUrl(imgUrl)
            })
    }

    return (
        <Link key={index} to={"/view-trip/" + trip.id}>
            <div className="hover:scale-105 transition-all">
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="User trip img" className="object-cover rounded-xl h-[220px]" />
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