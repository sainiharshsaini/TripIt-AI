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

export const AI_PROMPT: string = `Generate a travel plan for Location: {location}, for {totalDays} days, for {traveler}, with a {budget} budget. Return the response strictly in JSON format with the following structure:{ hotels: [ { hotelName:, hotelAddress:, price:, imageUrl:, geoCoordinates: {  latitude:,  longitude: }, rating:, description: } ],  itinerary: { day1: [ { placeName:,  placeDetails:, imageUrl:,  geoCoordinates: { latitude:, longitude: }, ticketPricing:, rating:, timeTravel:, bestTimeToVisit: } ], day2: [{ placeName:, placeDetails:, imageUrl:, geoCoordinates: { latitude:, longitude: }, ticketPricing:, rating:, timeTravel:, bestTimeToVisit: }], day3: [{placeName:, placeDetails:, imageUrl:, geoCoordinates: {latitude:, longitude: }, ticketPricing:, rating:, timeTravel:, bestTimeToVisit:}]}} Rules:- Always include at least 3 hotel options.- Always generate an itinerary for exactly {totalDays} days (minimum 3 days).- Use the exact variable names provided (hotelName, hotelAddress, placeName, etc.) without changing them.- Ensure all values are non-empty and realistic.- Only return valid JSON without extra text.`