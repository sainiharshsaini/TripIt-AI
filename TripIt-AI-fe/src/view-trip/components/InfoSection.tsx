import { Button } from "@/components/ui/button"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }: any) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
        } else {
            setPhotoUrl(null);
        }
    }, [trip]);

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

            const photoName = res?.data?.places?.[0]?.photos?.[3]?.name || res?.data?.places?.[0]?.photos?.[0]?.name

            if (photoName) {
                const imgUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No suitable photo found at expected index for location:", textQuery);
                setPhotoUrl(null);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
        }
    }

    return (
        <div className='p-5 md:p-10 lg:p-16 xl:p-20'>
            <img src={photoUrl || '/placeholder.jpg'}
                alt={`Image for ${trip?.userSelection?.location?.label || 'trip destination'}`}
                className='h-[340px] w-full object-cover rounded-xl shadow-md'
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl md:text-3xl">
                        {trip?.userSelection?.location?.label || 'Destination Unknown'}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂 No. Of Traveler: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
                <Button className="flex items-center gap-2 px-6 py-3">
                    <IoIosSend className="h-5 w-5" />
                    Share
                </Button>
            </div>
        </div>
    )
}

export default InfoSection