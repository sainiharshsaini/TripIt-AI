import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { FaPlayCircle } from "react-icons/fa";

function Hero() {
  return (
    <div className="flex flex-col items-center px-10 md:px-20 lg:px-40 mx-auto gap-10 my-15">
      <h1 className="font-extrabold text-[50px] md:text-[60px] lg:text-[80px] text-center leading-17 md:leading-normal">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] to-[#FF6347]">Unlock Your Perfect Adventure With AI: </span>Personalized Itineraries
      </h1>
      <p className="text-xl text-gray-600 text-center">
        Let Our intelligent platform crafts personalized travel itineraries, optimized routes, and insider recommendations, so you can discover new destinations, activities, and create unforgettable memories.
      </p>
      <div className="flex items-center gap-4">
        <Link to={"/create-trip"}>
          <Button className="rounded-full p-6 cursor-pointer bg-gray-900">
            Generate New Trip ✨
          </Button>
        </Link>
        <Link target="_blank" to={"https://youtu.be/zvLvXhXfdVM?si=rYjZWgFrn3NPt3SF"}>
          <Button variant={"outline"} className="rounded-full p-6 cursor-pointer">
            <FaPlayCircle className="text-red-500" size="lg" />
            How it works
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero