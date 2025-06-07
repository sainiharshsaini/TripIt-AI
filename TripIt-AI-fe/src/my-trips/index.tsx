import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { db } from "@/service/firebaseConfig";

// interface for the user object from localStorage
interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

// type for your trip object
interface Trip {
    id: string;
    userEmail: string;
    userSelection: any;
    tripData: any;
}

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
            await GetUserTrips();
        };
        fetchTrips();
    }, [])

    const GetUserTrips = async () => {
        setLoading(true);
        setError(null);

        const getUser = localStorage.getItem('user');
        const user: User | null = getUser ? JSON.parse(getUser) : null;

        console.log("Current User:", user);

        if (!user) {
            console.log("User not found, navigating to home.");
            navigate('/');
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, 'TripItAITrips'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);

            const fetchedTrips: Trip[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(doc.id, " => ", data);

                fetchedTrips.push({
                    id: doc.id,
                    userEmail: data.userEmail,
                    userSelection: data.userSelection,
                    tripData: data.tripData
                })
            });

            // Update state once after collecting all trips
            setUserTrips(fetchedTrips);

        } catch (error) {
            console.error("Error fetching user trips:", error);
            setError("Failed to load your trips. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips</h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
                            <p className="text-center">Loading trips...</p>
                        </div>
                    ))
                ) : userTrips.length > 0 ? (
                    userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">No trips found. Start planning your first adventure!</p>
                )}
            </div>
        </div>
    )
}


export default MyTrips