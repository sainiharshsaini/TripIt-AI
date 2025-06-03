import { db } from "@/service/firebaseConfig";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { useState, useEffect, useCallback } from "react";

interface TripData {
    id: string;
    userEmail: string;
    userSelection: any;
    tripData: any;
}

function ViewTrip() {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<TripData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const GetTripData = useCallback(async (currentTripId: string) => {
        setLoading(true);
        setError(null); // Clear previous errors

        const docRef = doc(db, 'TripItAITrips', currentTripId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as DocumentData;
                const tripData: TripData = {
                    id: docSnap.id,
                    userEmail: fetchedData.userEmail,
                    userSelection: fetchedData.userSelection,
                    tripData: fetchedData.tripData,
                };
                console.log("Document data:", tripData);
                setTrip(tripData);
            } else {
                console.log("No such Document!");
                toast.error("No trip found with this ID!");
                setTrip(null);
                setError("No trip found with this ID.");
            }
        } catch (err) {
            console.error("Error fetching trip data:", err);
            toast.error("Failed to load trip data. Please try again.");
            setTrip(null);
            setError("Failed to load trip data. Please try again.");
        } finally {
            setLoading(false);
        }

        console.log(trip);
        
    }, []); // Empty dependency array means this function is created once

    useEffect(() => {
        if (tripId) {
            GetTripData(tripId);
        } else {
            toast.error("Trip ID not found in URL.");
            setLoading(false);
            setError("Trip ID not found in URL.");
        }
    }, [tripId, GetTripData]); // GetTripData is stable due to useCallback

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 md:p-8 lg:p-20">
            {loading ? (
                // Display skeleton loaders while loading
                <div className="flex flex-col gap-4">
                    <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Loading trip data...</div>
                    <div className="h-[150px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                    <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
            ) : trip ? (
                <>
                    {/* Information Section */}
                    <InfoSection trip={trip} />
                    {/* Daily Plan */}
                    <PlacesToVisit trip={trip} />
                    {/* Recommended Hotels */}
                    <Hotels trip={trip} />
                </>
            ) : (
                // Display a message if no trip is found after loading
                <div className="text-center text-gray-500 text-xl mt-20">
                    Could not load trip details. No trip data available..
                </div>
            )}
        </div>
    )
}

export default ViewTrip