import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import geminiResponse from '@/service/AIModal';
import { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const OnGenerateTrip = async () => {
        if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all details")
            return;
        }
        const FINAL_PROMPT = AI_PROMPT
            // .replace('{location}', formData?.location?.label)
            .replace('{location}', formData?.location)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        console.log(FINAL_PROMPT);

        const result = geminiResponse
        console.log(result + "harsh");
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
                    {/* <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => { setPlace(value); handleInputChange('location', value) }
                        }}
                    /> */}

                    <Input type='string' placeholder='select location' onChange={(e) => handleInputChange('location', e.target.value)} />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        How many days are you planning your trip?
                    </h2>
                    <Input type='number' placeholder='Ex.3' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                </div>


                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is destination of choice?
                    </h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
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
                            <div key={index}
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
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
        </div>
    )
}

export default CreateTrip