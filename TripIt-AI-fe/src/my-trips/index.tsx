import { collection, query, where, getDocs} from "firebase/firestore";
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

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        GetUserTrips();
    }, [])

    const GetUserTrips = async () => {
        setLoading(true);
        const getUser = localStorage.getItem('user');
        const user: User | null = getUser ? JSON.parse(getUser) : null;

        console.log("Current User:", user);

        if (!user || !user.email) {
            console.log("User not found or email missing, navigating to home.");
            navigate('/');
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user.email));

            const querySnapshot = await getDocs(q);
            const fetchedTrips: any[] = [];
            setUserTrips([]);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(doc.id, " => ", data);

                fetchedTrips.push({
                    id: doc.id,
                    userEmail: data.userEmail,
                    userSelection: data.userSelection,
                    tripData: data.tripData
                })
                // setUserTrips(prevVal => [...prevVal, data])
                setUserTrips(fetchedTrips)
            });
        } catch (error) {
            console.error("Error fetching user trips:", error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips</h2>

            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {/* {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl">

                    </div>
                ))} */}

                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl">
                            
                        </div>
                    ))
                ) : userTrips.length > 0 ? (
                    userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">No trips found. Start planning a new adventure!</p>
                )}
            </div>
        </div>
    )
}


export default MyTrips