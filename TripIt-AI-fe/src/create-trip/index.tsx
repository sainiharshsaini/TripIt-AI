import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, budgetOptions, travelerOptions } from "@/lib/constants/options";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface LocationOption {
    label: string;
    value: string;
    place_id: string;
}

interface FormData {
    location?: LocationOption;
    noOfDays?: string;
    budget?: string;
    traveler?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

function CreateTrip() {
    const [place, setPlace] = useState<LocationOption | null>(null);
    const [formData, setFormData] = useState<FormData>({});
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const backendUrl = import.meta.env.VITE_TRIPIT_BACKEND_URL ?? "";
    const navigate = useNavigate();

    const handleInputChange = (name: keyof FormData, value: unknown) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (codeRes) => GetUserProfile(codeRes),
        onError: (error) => {
            console.error(error);
            toast.error("Google login failed. Please try again.");
        },
    });

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (!formData.noOfDays || !formData.location || !formData.budget || !formData.traveler) {
            toast.error("Please fill all details");
            return;
        }

        const numberOfDays = parseInt(formData.noOfDays);
        if (isNaN(numberOfDays) || numberOfDays <= 0 || numberOfDays > 5) {
            toast.error("Please enter a valid number of days between 1 and 5");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location.label || "")
            .replace(/{totalDays}/g, formData.noOfDays || "")
            .replace("{traveler}", formData.traveler || "")
            .replace("{budget}", formData.budget || "");

        console.log(FINAL_PROMPT);

        try {
            const result = await axios.post(`${backendUrl}/api/generate`, { prompt: FINAL_PROMPT });
            console.log(result.data.trip);
            SaveAiTrip(result.data.trip);
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to generate trip. Please try again.");
            setLoading(false);
        }
    };

    const SaveAiTrip = async (TripData: string) => {
        setLoading(true);
        const getUser = localStorage.getItem("user");
        const user: User | null = getUser ? JSON.parse(getUser) : null;

        if (!user) {
            toast.error("User not logged in.");
            setLoading(false);
            return;
        }

        const docId = Date.now().toString();

        try {
            const parsedTripData = JSON.parse(TripData);

            await setDoc(doc(db, "TripItAITrips", docId), {
                userSelection: formData,
                tripData: parsedTripData,
                userEmail: user.email,
                id: docId,
            });

            setLoading(false);
            navigate(`/view-trip/${docId}`);
        } catch (error) {
            console.error("Error saving AI trip:", error);
            toast.error("Failed to save trip. Please try again.");
            setLoading(false);
        }
    };

    const GetUserProfile = async (tokenInfo: { access_token: string }) => {
        try {
            const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo.access_token}`,
                    Accept: "application/json",
                },
            });
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data));
            setOpenDialog(false);
            OnGenerateTrip();
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to get user profile. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-20">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-4 text-gray-500 text-lg">
                Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
            </p>
            <div className="mt-16 flex flex-col gap-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (value: any) => {
                                setPlace(value);
                                handleInputChange("location", value);
                            },
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
                    <Input
                        type="number"
                        placeholder="Ex. 3"
                        value={formData.noOfDays || ""}
                        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                    />
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">Select your Hotels Type for Trip?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                        {budgetOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? "shadow-lg border-black" : ""
                                    }`}
                                onClick={() => handleInputChange("budget", item.title)}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                        {travelerOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.people ? "shadow-lg border-black" : ""
                                    }`}
                                onClick={() => handleInputChange("traveler", item.people)}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-10 flex justify-end">
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}
                    className="px-8 py-4 rounded-full text-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out focus-visible:ring-4 focus-visible:ring-orange-400 focus-visible:ring-opacity-70 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                    {loading ? (
                        <>
                            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin mr-2" />
                            Generating...
                        </>
                    ) : (
                        "Generate Trip"
                    )}
                </Button>
            </div>

            {/* Sign In Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-xl text-center">
                    <DialogHeader>
                        <img
                            src="/TripIt-AI-logo.png"
                            alt="logo"
                            height={80}
                            width={80}
                            className="mx-auto my-4"
                            loading="lazy"
                        />
                        <DialogTitle className="font-bold text-2xl text-gray-800 mb-2">Welcome to TripIt-AI!</DialogTitle>
                        <DialogDescription className="text-gray-600 mb-6">
                            Plan your perfect trips effortlessly. Sign in with Google to get started.
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        className="w-full flex items-center cursor-pointer justify-center gap-3 py-3 text-md rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 shadow-md"
                        onClick={() => login()}
                    >
                        <FcGoogle className="h-7 w-7" />
                        Sign In with Google
                    </Button>
                    <p className="text-xs text-gray-400 mt-4">
                        By signing in, you agree to our{" "}
                        <a href="#" className="underline hover:text-blue-500">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-blue-500">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
