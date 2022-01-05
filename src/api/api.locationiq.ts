import axios, { AxiosInstance } from 'axios'


const instance: AxiosInstance = axios.create({
    baseURL:"https://us1.locationiq.com/v1",
    params: {
        key: process.env.REACT_APP_LOCATIONIQ_API_KEY
    }
})

export const getCurrentLocation = ({lat, lon} : Record<'lat'| 'lon', number>) => {
    return instance.get('reverse.php', {
        params: {
            lat,
            lon,
            format: 'json'
        }
    })
}