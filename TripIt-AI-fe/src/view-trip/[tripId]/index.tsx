import { db } from "@/service/firebaseConfig";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { useState, useEffect } from "react";


function ViewTrip() {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        } else {
            toast.error("Trip ID not found in URL.");
            setLoading(false);
        }
    }, [tripId])

    const GetTripData = async () => {
        setLoading(true);

        if (!tripId) {
            console.error("Attempted to fetch trip data without a tripId.");
            setLoading(false);
            return;
        }

        const docRef = doc(db, 'AiTrips', tripId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as DocumentData

                const tripData: any = {
                    id: docSnap.id,
                    userEmail: fetchedData.userEmail,
                    userSelection: fetchedData.userSelection,
                    tripData: fetchedData.tripData
                };
                console.log("Document data:", tripData);
                setTrip(tripData);
            } else {
                console.log("No such Document!");
                toast.error("No trip found with this ID!");
                setTrip(null); // Clear trip if not found
            }

        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast.error("Failed to load trip data. Please try again.");
            setTrip(null);
        } finally {
            setLoading(false);
        }

        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document:", docSnap.data());
        //     setTrip(docSnap.data())
        // } else {
        //     console.log("No such Document");
        //     toast("No trip found!")
        // }
    }
    return (
        <div className="p-4 md:p-8 lg:p-12">
            {loading ? (
                // Display skeleton loaders while loading
                <div className="flex flex-col gap-4">
                    <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
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
                    Could not load trip details. Please check the ID.
                </div>
            )}
        </div>
    )
}

export default ViewTrip