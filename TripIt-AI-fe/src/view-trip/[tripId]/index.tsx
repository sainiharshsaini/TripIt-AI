import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";


function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const docRef = doc(db, 'AiTrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            console.log("No such Document");
            toast("No trip found!")
        }
    }
    return (
        <div>
            {/* Information Section */}
            <InfoSection trip={trip}/>
            {/* Recommended Hotels */}
            <Hotels trip={trip}/>
            {/* Daily Plan */}
            <PlacesToVisit trip={trip}/>
            {/* Footer */}
            <Footer trip={trip}/>
        </div>
    )
}

export default ViewTrip