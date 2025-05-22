import { Button } from "@/components/ui/button"
import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ place, index }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (place) GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }

        await GetPlaceDetails(data)
            .then(res => {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
                setPhotoUrl(imgUrl)
            })
    }

    return (
        <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
            <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="place img" className="w-[130px] h-[130px] rounded-xl object-cover" />
                <div>
                    <h2 className="font-bold text-lg">{place.placeName}</h2>
                    <p className="text-sm text-gray-400">{place.Details}</p>
                    <h2 className="mt-2">🕙 {place.timeTravel}</h2>
                    <Button size="sm"><FaMapLocation /></Button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem