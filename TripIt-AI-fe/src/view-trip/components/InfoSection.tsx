import { Button } from "@/components/ui/button";
import { getPlaceDetails, getPhotoRefUrl } from "@/service/GlobalApi";
import { useEffect, useState, useCallback } from "react";
import { IoIosSend } from "react-icons/io";

interface Trip {
    userSelection: {
        location?: {
            label: string;
        };
        noOfDays?: number | string;
        budget?: string;
        traveler?: string;
    };
}

interface InfoSectionProps {
    trip: Trip;
}

function InfoSection({ trip }: InfoSectionProps) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const getPlacePhoto = useCallback(async () => {
        const textQuery = trip?.userSelection?.location?.label;

        if (!textQuery) {
            console.warn("No location label found for trip, cannot fetch photo.");
            setPhotoUrl(null);
            return;
        }

        try {
            const res = await getPlaceDetails({ textQuery });

            const place = res?.places?.[0];
            const photos = place?.photos;
            // Use 4th photo if exists, otherwise fallback to first photo or null
            const photoName = photos && photos.length > 3 ? photos[3].name : photos?.[0]?.name;

            if (photoName) {
                const imgUrl = getPhotoRefUrl(photoName);
                setPhotoUrl(imgUrl);
            } else {
                console.warn("No suitable photo found at expected index for location:", textQuery);
                setPhotoUrl(null);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl(null);
        }
    }, [trip]);

    useEffect(() => {
        getPlacePhoto();
    }, [getPlacePhoto]);

    return (
        <div className="md:p-10 lg:p-16 xl:p-20">
            <img
                src={photoUrl || "/placeholder.jpg"}
                alt={`Image for ${trip?.userSelection?.location?.label || "trip destination"}`}
                className="h-[340px] w-full object-cover rounded-xl shadow-md"
                loading="lazy"
                decoding="async"
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl md:text-3xl">
                        {trip?.userSelection?.location?.label || "Destination Unknown"}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-5">
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md" aria-label="Number of days">
                            📅 {trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays && trip.userSelection.noOfDays !== 1 ? 's' : ''}
                        </span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md" aria-label="Budget">
                            💰 {trip?.userSelection?.budget} Budget
                        </span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md" aria-label="Number of travelers">
                            🥂 No. Of Traveler: {trip?.userSelection?.traveler}
                        </span>
                    </div>
                </div>
                <Button className="flex items-center gap-2 px-6 py-3" aria-label="Share trip">
                    <IoIosSend className="h-5 w-5" aria-hidden="true" />
                    Share
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;
