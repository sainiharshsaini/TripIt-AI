import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

interface FormData {
    location?: string;
    noOfDays?: string;
    budget?: string;
    traveler?: string;
}

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState<FormData>({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeRes) => GetUserProfile(codeRes),
        onError: (error) => console.log(error)
    })

    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays && parseInt(formData.noOfDays) > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all details")
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label || '')
            // .replace('{location}', formData?.location || '')
            .replace('{totalDays}', formData?.noOfDays || '')
            .replace('{traveler}', formData?.traveler || '')
            .replace('{budget}', formData?.budget || '')
            .replace('{totalDays}', formData?.noOfDays || '')

        console.log(FINAL_PROMPT);

        try {
            const result = await axios.post('http://localhost:3000/api/generate', { prompt: FINAL_PROMPT })
            console.log(result.data.trip);
            setLoading(false);
            SaveAiTrip(result?.data?.trip)

        } catch (error) {
            console.error("Error sending message:", error);
            alert('Failed to generate trip.')
        }
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }

    const GetUserProfile = (tokenInfo: any) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            OnGenerateTrip();
        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>
                Tell us your travel preferences 🏕️🌴
            </h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
            </p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is destination of choice?
                    </h2>
                    {/* i am not getting suggestion because i don't add google place api key */}
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => { setPlace(value); handleInputChange('location', value) }
                        }}
                    />

                    {/* <Input
                        type='string'
                        placeholder='Select location'
                        onChange={(e) => handleInputChange('location', e.target.value)}
                    /> */}
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        How many days are you planning your trip?
                    </h2>
                    <Input
                        type='number'
                        placeholder='Ex. 3'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is destination of choice?
                    </h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}
                                onClick={() => handleInputChange('budget', item.title)}
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        Who do you plan on traveling with on your next adventure?
                    </h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelesList.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}
                                onClick={() => handleInputChange('traveler', item.people)}
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='my-10 flex justify-end'>
                <Button disabled={loading} onClick={OnGenerateTrip}>
                    {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"}
                </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="logo" />
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign into the App with Google Authentication securely</p>

                            <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='h-7 w-7' />Sign In With Google</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateTrip