import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL: string = 'https://places.googleapis.com/v1/places:searchText';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id',
    },
};

export interface PlaceDetailsReqData {
    textQuery: string;
}

export const getPlaceDetails = async (data: PlaceDetailsReqData) => {
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Constructs a URL to fetch place media (photo) using place name.
 * @param placeName Place identifier or name
 * @param maxHeight Optional maximum photo height (default 1000)
 * @param maxWidth Optional maximum photo width (default 1000)
 */
export const getPhotoRefUrl = (
    placeName: string,
    maxHeight: number = 1000,
    maxWidth: number = 1000
): string => {
    return `https://places.googleapis.com/v1/${encodeURIComponent(placeName)}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${API_KEY}`;
};
