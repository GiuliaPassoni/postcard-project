//API 2: input: geo coords => output: weather icon + temperature (C and F)
import axios from 'axios'

// const lat:number = 52.3676
// const long:number = 4.9041

// //temp converter
const celsiusToFahrenheit = (tempC:number) =>{
    let fahrenheit:number = Math.round((tempC*9/5+32)*10)/10
    return fahrenheit
}
const fahrenheitToCelsius = (tempF:number) =>{
    let celsius:number = Math.round(((tempF-32)*5/9)*10)/10
    return celsius
}

const weatherApiKey : string  = "f53d6936ebfd6310c7c2bedc71382575"
//create type for result data that we need:
export type Weather = {
    show: boolean;
    weather: string;
    temp:number;
    feelTemp:number;
    weatherIconSrc:string;
    // unit:string
}

const WeatherApi = (lat:number,long:number):any=>{
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}`)
        .then((result)=>{
            let allData:any | undefined = result.data;
            // console.log('weather data', allData)
            return {
                weather:allData.weather[0].main,
                feelTemp:Math.floor((allData.main.feels_like-273.15)*10)/10,
                temp:Math.floor((allData.main.temp-273.15)*10)/10,
                weatherIconSrc: `http://openweathermap.org/img/wn/${allData.weather[0].icon}@2x.png`
                // weatherIconSrc:allData.weather[0].id
            };
        })
}

export {WeatherApi,celsiusToFahrenheit, fahrenheitToCelsius }