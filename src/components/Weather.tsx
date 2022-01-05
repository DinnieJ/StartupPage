import React from "react";
import { getCurrentLocation } from "../api/api.locationiq";
import { getCurrentLocationWeather } from "../api/api.openweather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons/faCloudSun'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons/faCloudRain'
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons/faCloudShowersHeavy'
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud'
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion'
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons/faThermometerHalf'
import { faWater } from '@fortawesome/free-solid-svg-icons/faWater'
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons/faSnowflake'
import './Weather.css'

export interface IWeatherProps { }

export default function Weather(props: IWeatherProps) {
    const [isGeoEnabled, setGeoEnabled] = React.useState<boolean>(false)
    const [weather, setWeather] = React.useState<any>(null)
    const [time, setTime] = React.useState<Date>(new Date());
    const [location, setLocation] = React.useState<any>("Getting location...")
    const [forecast, setForecast] = React.useState<any>(null)

    const coordinate = React.useRef<Record<'lat' | 'lon', number> | null>(null)

    const timeString = React.useMemo(() => ({
        time: `${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:` +
            `${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:` +
            `${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}`,
        date: time.toDateString()
    }), [time])


    const getWeather = React.useCallback(async () => {
        if (isGeoEnabled) {
            const weather: any = await getCurrentLocationWeather(coordinate.current);
            const loc: any = await getCurrentLocation(coordinate.current);
            weather.data && setWeather(weather.data);
            loc.data && setLocation(loc.data.display_name);
        }
    }, [isGeoEnabled])

    // get weather and location
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                coordinate.current = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                };
                getWeather()
                setGeoEnabled(true)
            })
        }
    }, [isGeoEnabled, getWeather]);



    //clock
    React.useEffect(() => {
        const i = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(i)
        }
    })

    return (
        <div className="top-banner w-full h-60 px-5 py-5 flex flex-start">
            <div className="flex w-full bg-gray-800 bg-opacity-30 hover:bg-opacity-90 transition-all duration-200 ease-in-out">
                <div className="flex flex-col justify-center text-white w-1/3">
                    <div className="text-white mx-auto text-7xl font-light">
                        {timeString.time}
                    </div>
                    <div className="text-white mx-auto text-2xl font-light">
                        {timeString.date}
                    </div>
                    <div className="h-8 mx-auto flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" />
                        <p className="my-auto font-bold">{isGeoEnabled ?  location ?? "Location not available" : "Your access to location is disabled"}</p>
                    </div>
                </div>
                <div className="w-2/3 text-white">
                    <WeatherData weather={weather} />
                </div>
            </div>
        </div>
    );
}

interface IWeatherDataProps {
    weather: any
}
const WeatherData = (props: IWeatherDataProps) => {
    const weatherIcon = React.useMemo(() => {
        if (props.weather) {
            switch (props.weather.weather[0].main) {
                case "Clear": return faCloudSun
                case "Drizzle": return faCloudRain
                case "Rain": return faCloudShowersHeavy
                case "Clouds": return faCloud
                case "Snow": return faSnowflake
                default: return faQuestion
            }
        }
    }, [props.weather])

    if (props.weather) {
        return (
            <div className="p-3 h-full">
                <div className="w-1/3 h-full">
                    <div className="flex flex-row justify-start items-center">
                        <FontAwesomeIcon icon={weatherIcon} className="text-white" size="3x" />
                        <p className="font-light text-white text-2xl mx-3 uppercase">{props.weather.weather[0].description}</p>
                    </div>
                    <div id="temp" className="mt-2 flex flex-row justify-start items-center">
                        <FontAwesomeIcon icon={faThermometerHalf} size="2x" className="text-white" />
                        <p className="font-light text-white text-lg mx-3">{`Temperature: ${props.weather.main.temp} °C`}</p>
                    </div>
                    <div id="humid" className="mt-2 flex flex-row justify-start items-center">
                        <FontAwesomeIcon icon={faWater} size="1x" className="text-white" />
                        <p className="font-light text-white text-lg mx-3">{`Humidity: ${props.weather.main.humidity}%`}</p>
                    </div>
                    <div id="wind" className="mt-2 flex flex-row justify-start items-center">
                        <FontAwesomeIcon icon={faWind} size="1x" className="text-white" />
                        <p className="font-light text-white text-lg mx-3">{`Wind Speed: ${props.weather.wind.speed} m/s`}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p>Weather is not available</p>
    }
}
