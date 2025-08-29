import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaPlayCircle } from "react-icons/fa";

function Hero() {
  return (
    <section className="flex flex-col items-center px-10 md:px-20 lg:px-40 mx-auto gap-10 my-15" aria-label="Hero Section">
      <h1 className="font-extrabold text-[2.5rem] md:text-[3.75rem] lg:text-[5rem] text-center leading-tight md:leading-normal">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] to-[#FF6347]">
          Unlock Your Perfect Adventure With AI:
        </span>{" "}
        Personalized Itineraries
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-3xl">
        Let our intelligent platform craft personalized travel itineraries, optimized routes, and insider recommendations –
        discover new destinations, activities, and create unforgettable memories.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/create-trip">
          <Button className="rounded-full px-8 py-4 font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none">
            Generate New Trip ✨
          </Button>
        </Link>
        <Link
          to="https://youtu.be/zvLvXhXfdVM?si=rYjZWgFrn3NPt3SF"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch how it works on YouTube"
        >
          <Button
            variant="outline"
            className="rounded-full px-8 py-4 font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            <FaPlayCircle className="text-red-500" size={24} aria-hidden="true" />
            How it works
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
