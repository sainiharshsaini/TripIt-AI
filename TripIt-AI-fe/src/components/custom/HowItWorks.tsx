import { Target, Calendar, Plane } from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            icon: <Target className="text-[#FF6347]" size={28} />,
            title: 'Choose Your Destination',
            description: 'Tell us where you want to go, or let our AI suggest destinations based on your preferences.'
        },
        {
            icon: <Calendar className="text-[#FF6347]" size={28} />,
            title: 'Generate Your Itinerary',
            description: 'Our AI creates a personalized day-by-day plan with activities, restaurants, and accommodations.'
        },
        {
            icon: <Plane className="text-[#FF6347]" size={28} />,
            title: 'Enjoy Your Trip',
            description: 'Access your itinerary anytime, make adjustments on the go, and create lasting memories.'
        }
    ];

    return (
        <section className="py-15 bg-white">
            <div className="container mx-auto lg:px-20">
                <div className="text-center mb-15">
                    <h2 className="text-3xl font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Planning your perfect trip is just three simple steps away with our AI-powered platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    {step.icon}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(50%-2rem)] h-0.5 bg-gray-200"></div>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks