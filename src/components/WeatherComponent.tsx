//API 2
import {Weather, WeatherApi, celsiusToFahrenheit, fahrenheitToCelsius} from "./../API Calls/WeatherApi";
import React, {useEffect, useState, useCallback} from "react";
import {allCapitals} from "../API Calls/GeoCoordsApi";

interface IWeatherProps{
    locat:any,
    lat:any,
    long:any
}

// export default function WeatherComponent(props:any){
export default function WeatherComponent({locat, lat, long}:IWeatherProps){
    console.log('props again', lat, long, locat)
    //API 2: WEATHER
    const initialWeather: Weather = {show: false, weather:'', temp:0, feelTemp:0, weatherIconSrc:''}
    const [allweather, setAllweather]=useState<Weather>(initialWeather)

    const getWeatherData = useCallback(
        async () => {
            console.log(locat, lat, long, 'my props for weather')
            const result = await WeatherApi(lat,long);
            setAllweather({
                show: true,
                weather: result.weather,
                feelTemp: result.feelTemp,
                temp: result.temp,
                weatherIconSrc:result.weather[0].id
            })
        },
        [locat, lat, long],
    );

    useEffect(() => {
        if(locat!==''){
            getWeatherData()
        }
        // return () => ()
    }, [getWeatherData, locat]);

    return(
        <>
            {/*{allweather.show === true &&*/}
            <div>
                <h1>Weather box again!</h1>
                <p>Weather is: {allweather.weather}</p>

                <p>T: {allweather.temp} <button onClick={()=>celsiusToFahrenheit(allweather.temp)}> C</button></p>
                <p><button onClick={()=>fahrenheitToCelsius(allweather.temp)}>F</button></p>
                {/*<p>feels like: {allweather.feelTemp}</p>*/}
                <p>{allweather.weatherIconSrc}</p>
            </div>
            {/*}*/}
        </>
    )
}