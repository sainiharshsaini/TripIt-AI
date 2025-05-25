import axios, { type AxiosRequestConfig } from "axios"

const BASE_URL: string = 'https://places.googleapis.com/v1/places:searchText'

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

interface PlaceDetailsReqData {
    textQuery: string
}

export const GetPlaceDetails = (data: PlaceDetailsReqData) => {
    return axios.post(BASE_URL, data, config)
}

export const PHOTO_REF_URL: string = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY