import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});
const config = {
  responseMimeType: 'application/json',
};
const model = 'gemini-2.0-flash';
const contents = [
  {
    role: 'user',
    parts: [
      {
        text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: `Okay, here's a JSON-formatted travel plan for a budget-friendly 3-day trip to Las Vegas for a couple. I've focused on free or inexpensive activities and dining options, and prioritized hotels that offer good value. Note that prices are estimates and can fluctuate significantly depending on the time of year, day of the week, and availability. Always double-check prices and availability before booking.

\`\`\`json
{
  "tripName": "Las Vegas Budget Getaway - 3 Days for Two",
  "budget": "Cheap",
  "travelers": "Couple",
  "location": "Las Vegas, NV",
  "currency": "USD",
  "hotelOptions": [
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": 40,
      "hotelImageUrl": "https://www.circuscircus.com/wp-content/uploads/2023/08/CircusCircus-Exterior-Night-min.jpg",
      "geoCoordinates": {
        "latitude": 36.1260,
        "longitude": -115.1669
      },
      "rating": 3.5,
      "description": "A classic Vegas experience with a circus theme. Offers affordable rooms, free circus acts, and a variety of dining options. Located on the north end of the Strip.",
      "amenities": ["Pool", "Casino", "Circus Acts", "Restaurants", "Arcade", "Free Parking"]
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": 45,
      "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/excalibur/property-details/excalibur-exterior-property-details-1200x675.adapt.1200.1.jpg",
      "geoCoordinates": {
        "latitude": 36.0984,
        "longitude": -115.1743
      },
      "rating": 4.0,
      "description": "A medieval-themed hotel at the south end of the Strip. Offers affordable rooms and a variety of entertainment options.",
      "amenities": ["Pool", "Casino", "Restaurants", "Shows", "Shopping", "Free Parking"]
    },
    {
      "hotelName": "Luxor Hotel & Casino",
      "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "price": 50,
      "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/luxor/property-details/luxor-exterior-property-details-1200x675.adapt.1200.1.jpg",
      "geoCoordinates": {
        "latitude": 36.0956,
        "longitude": -115.1757
      },
      "rating": 4.0,
      "description": "An Egyptian-themed hotel with a distinctive pyramid shape. Offers affordable rooms and several entertainment options.",
      "amenities": ["Pool", "Casino", "Restaurants", "Shows", "Shopping", "Free Parking"]
    },
        {
      "hotelName": "Strat Hotel, Casino & Skypod",
      "hotelAddress": "2000 Las Vegas Blvd S, Las Vegas, NV 89104",
      "price": 65,
      "hotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/6f/34/59/the-strat-hotel-casino.jpg?w=700&h=-1&s=1",
      "geoCoordinates": {
        "latitude": 36.1470,
        "longitude": -115.1556
      },
      "rating": 4.0,
      "description": "Located at the northern end of the Strip, the Strat offers stunning views from its Skypod. Rooms are generally affordable.",
      "amenities": ["Pool", "Casino", "Restaurants", "Shows", "Skypod", "Thrill Rides", "Free Parking"]
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "The Strip Exploration and Free Entertainment",
      "morning": {
        "placeName": "Welcome to Las Vegas Sign",
        "placeDetails": "Take a photo at the iconic 'Welcome to Fabulous Las Vegas' sign.  It's a must-do for any Vegas trip. Be prepared to wait in line.",
        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Welcome_to_Las_Vegas_sign.JPG/1280px-Welcome_to_Las_Vegas_sign.JPG",
        "geoCoordinates": {
          "latitude": 36.0826,
          "longitude": -115.1732
        },
        "ticketPricing": "Free",
        "rating": 4.5,
        "timeToTravelFromHotel": "10-20 minutes (depending on hotel location, use ride-sharing or bus)",
        "bestTimeToVisit": "Early morning (less crowded)"
      },
      "afternoon": {
        "placeName": "Bellagio Conservatory & Botanical Garden",
        "placeDetails": "A beautiful, free attraction inside the Bellagio.  The display changes seasonally.",
        "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-details-desktop.jpg",
        "geoCoordinates": {
          "latitude": 36.1127,
          "longitude": -115.1745
        },
        "ticketPricing": "Free",
        "rating": 4.8,
        "timeToTravelFromPrevious": "15-20 minute walk from Welcome Sign (or bus ride)",
        "bestTimeToVisit": "Anytime during the day"
      },
      "evening": {
        "placeName": "Fountains of Bellagio",
        "placeDetails": "A spectacular free water show set to music in front of the Bellagio hotel.  Shows run every 30 minutes in the afternoon and evening.",
        "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/fountains-of-bellagio/bellagio-fountains-hero-1400x658.adapt.1900.1.jpg",
        "geoCoordinates": {
          "latitude": 36.1129,
          "longitude": -115.1743
        },
        "ticketPricing": "Free",
        "rating": 5.0,
        "timeToTravelFromPrevious": "Adjacent to the Conservatory",
        "bestTimeToVisit": "Evening (for the lights)"
      },
           "dinner": {
            "placeName": "In-N-Out Burger",
            "placeDetails": "A West Coast Classic. Budget friendly",
            "placeImageUrl": "https://www.in-n-out.com/static/cms/images/home/sliders/carousel-menu@2x.jpg",
            "geoCoordinates": {
              "latitude": 36.0773,
              "longitude": -115.1507
            },
            "ticketPricing": "$10-15",
            "rating": 4.6,
            "timeToTravelFromPrevious": "20 minute bus ride",
            "bestTimeToVisit": "Anytime"
          }
    },
    "day2": {
      "theme": "Downtown Las Vegas & Fremont Street Experience",
      "morning": {
        "placeName": "Fremont Street Experience",
        "placeDetails": "A pedestrian mall in Downtown Las Vegas featuring a canopy screen that shows light and music shows.  It's a completely different vibe than the Strip.",
        "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2023/08/fremont-street-experience-lights-720x480.jpg",
        "geoCoordinates": {
          "latitude": 36.1703,
          "longitude": -115.1420
        },
        "ticketPricing": "Free",
        "rating": 4.6,
        "timeToTravelFromHotel": "30-45 minutes by bus from the Strip.",
        "bestTimeToVisit": "Daytime to explore the area before it gets too crowded."
      },
      "afternoon": {
        "placeName": "The Neon Museum",
        "placeDetails": "Explore historic Las Vegas neon signs.  Consider the guided tour for a more in-depth experience (ticket required).",
        "placeImageUrl": "https://www.neonmuseum.org/wp-content/uploads/2023/02/Neon-Museum-Sign-Garden-1.jpg",
        "geoCoordinates": {
          "latitude": 36.1741,
          "longitude": -115.1403
        },
        "ticketPricing": "Museum from $30 - $35",
        "rating": 4.7,
        "timeToTravelFromPrevious": "5-10 minute walk from Fremont Street",
        "bestTimeToVisit": "Afternoon"
      },
      "evening": {
        "placeName": "Fremont Street Experience Light Show",
        "placeDetails": "Catch the Viva Vision light show on the Fremont Street Experience canopy.  Shows run throughout the evening.",
        "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2023/08/fremont-street-experience-lights-720x480.jpg",
        "geoCoordinates": {
          "latitude": 36.1703,
          "longitude": -115.1420
        },
        "ticketPricing": "Free",
        "rating": 4.8,
        "timeToTravelFromPrevious": "N/A (Same Location)",
        "bestTimeToVisit": "Evening (any show)"
      },
            "dinner": {
            "placeName": "Heart Attack Grill",
            "placeDetails": "If you are feeling adventurous, you can try Heart Attack Grill. Known for its extremely unhealthy and high-calorie menu.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Heart_Attack_Grill.jpg/800px-Heart_Attack_Grill.jpg",
            "geoCoordinates": {
              "latitude": 36.1707,
              "longitude": -115.1424
            },
            "ticketPricing": "$15-$25",
            "rating": 3.7,
            "timeToTravelFromPrevious": "walking distance",
            "bestTimeToVisit": "Evening"
          }
    },
    "day3": {
      "theme": "Relaxing and Exploring Resort Amenities",
      "morning": {
        "placeName": "Hotel Pool Time",
        "placeDetails": "Enjoy the pool at your hotel. Relax and soak up the Vegas sun.",
        "placeImageUrl": "https://pixabay.com/images/id-260679/",
        "geoCoordinates": {
          "latitude": null,
          "longitude": null
        },
        "ticketPricing": "Free (included with hotel stay)",
        "rating": 4.0,
        "timeToTravelFromHotel": "N/A (Hotel Amenity)",
        "bestTimeToVisit": "Morning (before it gets too crowded)"
      },
      "afternoon": {
        "placeName": "The LINQ Promenade",
        "placeDetails": "An outdoor shopping, dining, and entertainment district near the High Roller observation wheel. Window shop and people-watch.",
        "placeImageUrl": "https://caesars.com/content/dam/clv/Images/Promenade/LINQ_Promenade_Overhead_View_with_Wheel_High_Roller_at_night_1200x675.jpg",
        "geoCoordinates": {
          "latitude": 36.1168,
          "longitude": -115.1691
        },
        "ticketPricing": "Free (window shopping)",
        "rating": 4.3,
        "timeToTravelFromHotel": "15-30 minutes (depending on hotel location, use ride-sharing or bus)",
        "bestTimeToVisit": "Afternoon"
      },
      "evening": {
        "placeName": "Mirage Volcano",
        "placeDetails": "A free volcano eruption show in front of the Mirage hotel. Shows run several times nightly.",
        "placeImageUrl": "https://media.cntraveler.com/photos/6455e4c49c03b624c045e22b/16:9/w_3840,h_2160,c_limit/Mirage_Volcano_GettyImages-1251620456.jpg",
        "geoCoordinates": {
          "latitude": 36.1212,
          "longitude": -115.1743
        },
        "ticketPricing": "Free",
        "rating": 4.7,
        "timeToTravelFromPrevious": "10-15 minute walk from the LINQ Promenade",
        "bestTimeToVisit": "Evening (for the best visual effect)"
      },
            "dinner": {
            "placeName": "Secret Pizza",
            "placeDetails": "A hidden pizza place in the Cosmopolitan Hotel. This is a good place to grab a quick and satisfying meal on the strip.",
            "placeImageUrl": "https://static.wixstatic.com/media/813b98_d6646d24277f47c9a24567f5c38c5e47~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/813b98_d6646d24277f47c9a24567f5c38c5e47~mv2.jpg",
            "geoCoordinates": {
              "latitude": 36.1114,
              "longitude": -115.1719
            },
            "ticketPricing": "$5-10 per slice",
            "rating": 4.7,
            "timeToTravelFromPrevious": "15-20 Minute walk",
            "bestTimeToVisit": "Evening"
          }
    }
  },
  "notes": [
    "Utilize public transportation (buses) to save money on transportation.  Purchase a day pass for unlimited rides.",
    "Look for free shows and attractions.",
    "Take advantage of happy hour deals for drinks and appetizers.",
    "Consider packing snacks and drinks to avoid overspending on convenience store items.",
    "Check for free casino loyalty programs for potential discounts and perks.",
    "Prices and show schedules are subject to change. Always verify before your trip."
  ]
}
\`\`\`

**Important Considerations and Tips for Staying Within Budget:**

*   **Timing is Key:** Avoid peak season (weekends, holidays, major conventions) for the best hotel rates.
*   **Transportation:** The Las Vegas Monorail is convenient but can be pricey.  Buses are the most budget-friendly option. Consider a 3-day bus pass. Ride-sharing (Uber/Lyft) can be cost-effective, especially if you split the fare with other travelers.  Walking is a great way to see the Strip, but wear comfortable shoes.
*   **Food:**  Avoid eating exclusively in hotel restaurants.  Look for cheaper options like fast food, food courts, or grocery stores for snacks and breakfast items.
*   **Drinks:**  Drinks on the Strip can be expensive. Take advantage of happy hour deals or pre-drink in your hotel room.
*   **Gambling:** Set a strict gambling budget and stick to it. Don't chase losses.
*   **Free Activities:** There are plenty of free things to do in Vegas. Focus on those!

**Disclaimer:**  I have made every effort to ensure the accuracy of the information provided. However, prices, schedules, and other details can change. Please verify all information before your trip.
`,
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        text: `INSERT_INPUT_HERE`,
      },
    ],
  },
];

export const chatSession = await ai.models.generateContentStream({
  model,
  config,
  contents,
});

let geminiResponse = '';

for await (const chunk of chatSession) {
  geminiResponse += chunk.text
  console.log(geminiResponse);
}

export default geminiResponse
