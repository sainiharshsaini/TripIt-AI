export interface Place {
    placeName: string;
    placeDetails?: string;
    ticketPricing?: string;
    rating?: number;
    timeTravel?: string;
    [key: string]: any;
}

export interface ItineraryDay {
    day: string;
    plan: Place[];
}

export interface Hotel {
    id?: string | number;
    hotelName?: string;
    hotelAddress?: string;
    imageUrl?: string;
    price?: string;
    rating?: number;
    [key: string]: any;
}

export interface TravelPlan {
    itinerary?: ItineraryDay[];
    hotels?: Hotel[];
    [key: string]: any;
}

export interface UserSelection {
  location?: { label: string; [key: string]: any };
  noOfDays?: number | string;
  budget?: string;
  traveler?: string;
  [key: string]: any;
}

export interface TripData {
  id: string;
  userEmail: string;
  userSelection: UserSelection;
  tripData: {
    travelPlan?: TravelPlan;
    [key: string]: any;
  };
}
