import { Compass, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-10 lg:px-20 mt-15" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Compass size={24} className="text-[#FF6347]" aria-hidden="true" />
              <span
                className="text-2xl font-bold bg-gradient-to-bl from-[#FFD700] to-[#FF6347] text-transparent bg-clip-text"
                aria-label="TripIt AI"
              >
                TripIt-AI
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your AI-powered travel companion for creating memorable journeys.
            </p>
            <div className="flex space-x-4" aria-label="Social Media Links">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <nav aria-label="Quick access links">
              <h3 className="font-semibold text-lg mb-4">Quick Access</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create-trip" className="text-gray-400 hover:text-white transition-colors">
                    Create Trip
                  </Link>
                </li>
                <li>
                  <Link to="/my-trips" className="text-gray-400 hover:text-white transition-colors">
                    My Trips
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-gray-400 hover:text-white transition-colors">
                    Explore
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Support links">
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </nav>

            <section aria-label="Contact information">
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-gray-400" aria-hidden="true" />
                  <a href="mailto:support@tripitai.com" className="text-gray-400 hover:text-white transition-colors">
                    support@tripitai.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-gray-400" aria-hidden="true" />
                  <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500" role="contentinfo">
          <p>© {new Date().getFullYear()} TripIt-AI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;