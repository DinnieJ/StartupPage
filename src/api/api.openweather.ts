import axios, { AxiosInstance } from 'axios'


const instance: AxiosInstance = axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5",
    params: {
        appID: process.env.REACT_APP_OPENWEATHER_API_KEY
    }
})

export const getCurrentLocationWeather = ({lat, lon} : Record<'lat'| 'lon', number>) => {
    return instance.get('weather', {
        params: {
            lat,
            lon,
            units: 'metric'
        }
    })
}

export const getForecastWeathers = ({lat, lon} : Record<'lat'| 'lon', number>) => {
    return instance.get('onecall', {
        params: {
            lat,
            lon,
            exclude: 'current,minutely,hourly',
            units: 'metric'
        }
    })
}
