import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carry Johnson",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    role: "Travel Enthusiast",
    content:
      "TripIt-AI made our family vacation to Italy absolutely seamless. The AI recommendations were spot on and saved us hours of research.",
    rating: 4,
  },
  {
    id: "2",
    name: "Michael Scott",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    role: "Digital Nomad",
    content:
      "As someone who travels frequently for work, this app has been a game-changer. The itineraries are perfectly balanced and the interface is beautiful.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma Roger",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    role: "First-time Traveler",
    content:
      "I was nervous about planning my first international trip, but TripIt-AI made it so easy and enjoyable. Highly recommend!",
    rating: 4,
  },
];

function Testimonials() {
  return (
    <section className="py-15 bg-white lg:px-20" aria-label="Testimonials Section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from travelers who have used our platform to create their perfect trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
              tabIndex={0}
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <div className="flex space-x-1 mb-4" aria-label={`Rated ${testimonial.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    aria-hidden="true"
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">"{testimonial.content}"</blockquote>
              <footer className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
