import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { useState, useEffect, useCallback } from "react";
import { db } from "@/service/firebaseConfig";
import type { TripData } from "@/lib/types";

function ViewTrip() {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<TripData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getTripData = useCallback(
        async (currentTripId: string) => {
            setLoading(true);
            setError(null);

            try {
                const docRef = doc(db, "TripItAITrips", currentTripId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const fetchedData = docSnap.data() as DocumentData;
                    const tripData: TripData = {
                        id: docSnap.id,
                        userEmail: fetchedData.userEmail,
                        userSelection: fetchedData.userSelection,
                        tripData: fetchedData.tripData,
                    };
                    setTrip(tripData);
                } else {
                    toast.error("No trip found with this ID!");
                    setTrip(null);
                    setError("No trip found with this ID.");
                }
            } catch (err) {
                toast.error("Failed to load trip data. Please try again.");
                setTrip(null);
                setError("Failed to load trip data. Please try again.");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (tripId) {
            getTripData(tripId);
        } else {
            toast.error("Trip ID not found in URL.");
            setError("Trip ID not found in URL.");
            setLoading(false);
        }
    }, [tripId, getTripData]);

    if (error) {
        return <div className="text-center p-4 text-red-500">
            Error: {error}
        </div>;
    }

    return (
        <div className="p-4 md:p-8 lg:p-20">
            {loading ? (
                <div className="flex flex-col gap-4">
                    <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                        Loading trip data...
                    </div>
                    <div className="h-[150px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                    <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
            ) : trip ? (
                <>
                    <InfoSection trip={trip} />
                    <PlacesToVisit trip={trip} />
                    <Hotels trip={trip} />
                </>
            ) : (
                <div className="text-center text-gray-500 text-xl mt-20">
                    Could not load trip details. No trip data available.
                </div>
            )}
        </div>
    );
}

export default ViewTrip;
