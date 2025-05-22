import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItem({ hotel, index }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (hotel) GetHotelPhoto();
    }, [hotel])

    const GetHotelPhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        
        await GetPlaceDetails(data)
            .then((res) => {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
                setPhotoUrl(imgUrl)
            })
    }

    return (
        <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target="_blank">
            <div className="hover:scale-105 transition-all cursor-pointer">
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="hotel img" className="rounded-xl h-[200px] w-full object-cover" />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                    <h2 className="text-sm">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem