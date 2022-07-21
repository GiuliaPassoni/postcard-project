//API 2: input: geo coords => output: weather icon + temperature (C and F)
import axios from 'axios'

const lat:number = 52.3676
const long:number = 4.9041

// //temp converter
// export const celsiusToFahrenheit = (tempC:number) =>{
//     let fahrenheit:number = tempC*9/5+32
//     return fahrenheit
// }
// export const fahrenheitToCelsius = (tempF:number) =>{
//     let celsius:number = (tempF-32)*5/9
//     return celsius
// }

const weatherApiKey : string | undefined  = process.env.REACT_APP_WEATHER_API
//create type for result data that we need:
export type Weather = {
    show: boolean;
    weather: string;
    temp:number;
    feelTemp:number;
    weatherIconSrc:string;
}

const WeatherApi = (lat:number,long:number):any=>{
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}`)
        .then((result)=>{
            let allData:any | undefined = result.data;
            console.log('weather pass')
            return {
                weather:allData.weather[0].main,
                feelTemp:Math.floor((allData.main.feels_like-273.15)*10)/10,
                temp:Math.floor((allData.main.temp-273.15)*10)/10
            };
        })
}

export default WeatherApi