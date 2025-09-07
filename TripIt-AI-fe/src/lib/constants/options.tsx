export interface TravelerOption {
    id: number;
    title: string;
    desc: string;
    icon: string;
    people: string;
}

export const travelerOptions: TravelerOption[] = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler in exploration',
        icon: '✈️',
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '💑',
        people: '2 People',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: '👪',
        people: '3 to 5 People',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '🥂',
        people: '5 to 10 People',
    },
];

export interface BudgetOption {
    id: number;
    title: string;
    desc: string;
    icon: string;
}

export const budgetOptions: BudgetOption[] = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '🪙',
    },
];

// export const AI_PROMPT: string =
//     `Generate a travel plan for Location: {location}, for {totalDays} days, for {traveler}, with a {budget} budget. 
// Give me a hotel options list with: Hotel name, address, price, hotel image URL, geo coordinates, rating, and descriptions.
// Also suggest an itinerary with: Place name, place details, image URL, geo coordinates, ticket pricing, rating, travel time to each location for 3 days, 
// with a plan for each day that includes the best time to visit, in JSON format.`;

export const AI_PROMPT: string = `Generate a travel plan for Location: {{location}}, for {{totalDays}} days, for {{traveler}}, with a {{budget}} budget.\n\nReturn the response strictly in JSON format with the following structure:\n\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"\",\n      \"hotelAddress\": \"\",\n      \"price\": \"\",\n      \"imageUrl\": \"\",\n      \"geoCoordinates\": {\n        \"latitude\": \"\",\n        \"longitude\": \"\"\n      },\n      \"rating\": \"\",\n      \"description\": \"\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"\",\n        \"placeDetails\": \"\",\n        \"imageUrl\": \"\",\n        \"geoCoordinates\": {\n          \"latitude\": \"\",\n          \"longitude\": \"\"\n        },\n        \"ticketPricing\": \"\",\n        \"rating\": \"\",\n        \"timeTravel\": \"\",\n        \"bestTimeToVisit\": \"\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"\",\n        \"placeDetails\": \"\",\n        \"imageUrl\": \"\",\n        \"geoCoordinates\": {\n          \"latitude\": \"\",\n          \"longitude\": \"\"\n        },\n        \"ticketPricing\": \"\",\n        \"rating\": \"\",\n        \"timeTravel\": \"\",\n        \"bestTimeToVisit\": \"\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"\",\n        \"placeDetails\": \"\",\n        \"imageUrl\": \"\",\n        \"geoCoordinates\": {\n          \"latitude\": \"\",\n          \"longitude\": \"\"\n        },\n        \"ticketPricing\": \"\",\n        \"rating\": \"\",\n        \"timeTravel\": \"\",\n        \"bestTimeToVisit\": \"\"\n      }\n    ]\n  }\n}\n\nRules:\n- Always include at least 3 hotel options.\n- Always generate an itinerary for exactly {{totalDays}} days (minimum 3 days).\n- Use the exact variable names provided (hotelName, hotelAddress, placeName, etc.) without changing them.\n- Ensure all values are non-empty and realistic.\n- Only return valid JSON without extra text.`