import { MapPin, Calendar, Plane } from "lucide-react"

function FeatureCard() {
    return (
        <div className="bg-gray-100 px-5 py-15 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Smart Destinations</h3>
                    <p className="text-gray-600">
                        AI-powered recommendations based on your preferences and travel style.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="text-orange-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Perfect Itineraries</h3>
                    <p className="text-gray-600">
                        Day-by-day plans optimized for your time, budget, and interests.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Plane className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Seamless Travel</h3>
                    <p className="text-gray-600">
                        Everything you need in one place, accessible offline during your journey.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard