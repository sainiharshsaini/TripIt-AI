import { Compass, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 px-10 lg:px-20 mt-15">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Compass size={24} className="text-[#FF6347]" />
                            <span className="text-2xl font-bold bg-gradient-to-bl from-[#FFD700] to-[#FF6347] text-transparent bg-clip-text">TripIt-AI</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your AI-powered travel companion for creating memorable journeys.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Quick as</h3>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                <li><a href="/create-trip" className="text-gray-400 hover:text-white transition-colors">Create Trip</a></li>
                                <li><a href="/my-trips" className="text-gray-400 hover:text-white transition-colors">My Trips</a></li>
                                <li><a href="/explore" className="text-gray-400 hover:text-white transition-colors">Explore</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail size={18} className="text-gray-400" />
                                    <span className="text-gray-400">support@tripitai.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone size={18} className="text-gray-400" />
                                    <span className="text-gray-400">+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} TripIt-AI. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        // <div className="py-6 px-3 border-t flex justify-center items-center mt-10">
        //     <h2 className="text-center text-gray-600">
        //         © 2025 TripIt-AI. All Rights Reserved.
        //     </h2>
        // </div>
    )
}

export default Footer