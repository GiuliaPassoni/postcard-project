import React, {useEffect, useState} from 'react'
import axios from 'axios'
import countryCapitals from './countryCapitals.json'

const locationTest:string = 'Amsterdam'

//API 1: Input: city name. Output: geo coordinates and info (currency, language, flag?, info?)
//DB Geo API doesn't work :( use local object with capital names and geo coords instead.
//To suggest values as user types, create array of capitals:
const allCapitals:string[] = Object.keys(countryCapitals);
//Suggest possible capitals using <datalist> html attribute

//find lat and long coordinates from list
// const selectLocation = (e:any) =>{
//     e.preventDefault()
//     let locationName:string = e.target.value
//     return locationName
// }

type geoCoords={
    lat:number;
    long:number;
}
// const searchThrough=(e:any)=>{
//     e.preventDefault()
//     let inputTest = e.target.value
//     inputTest = inputTest.charAt(0).toUpperCase() + inputTest.slice(1)
//     let whoknows:string[] =[]
//     let suggestions:string[] = []
//     whoknows.push(inputTest)
//     console.log(whoknows)
//     for(let i in allCapitals){
//         if(allCapitals[i].includes(whoknows[0])){
//             suggestions.push(allCapitals[i])
//         }
//     }
//    return suggestions
// }

//API 2: input: geo coords => output: weather icon + temperature (C and F)
//weather API key
const weatherApiKey : string | undefined  = process.env.REACT_APP_WEATHER_API
//create type for result data that we need:
type Weather = {
    show: boolean;
    weather: string;
    temp:number;
    feelTemp:number;
    weatherIconSrc:string;
}

const lat:number = 52.3676
const long:number = 4.9041
// https://api.openweathermap.org/data/2.5/weather?lat=52.3676&lon=4.9041&appid=f53d6936ebfd6310c7c2bedc71382575

//temp converter
const celsiusToFahrenheit = (tempC:number) =>{
    let fahrenheit:number = tempC*9/5+32
    return fahrenheit
}
const fahrenheitToCelsius = (tempF:number) =>{
    let celsius:number = (tempF-32)*5/9
    return celsius
}

const WeatherApi = ()=>{
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}`)
            .then((result)=>{
                let allData:any | undefined = result.data;
                return {
                    weather:allData.weather[0].main,
                    feelTemp:Math.floor((allData.main.feels_like-273.15)*10)/10,
                    temp:Math.floor((allData.main.temp-273.15)*10)/10
                };
            })
}

//API 3: pictures of the location
//
const photosApiKey : string | undefined  = process.env.REACT_APP_IMAGES_API

let imagesUrl:string[] = []
let orientation:string='portrait'
const LocationPictures = () => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${locationTest}&orientation=${orientation}&count=3&client_id=${photosApiKey}&per_page=3`)
        .then((result)=>{
            console.log(result)
        })
}



const ApiCalls=()=>{
    //API1: LOCATION
    const [location, setLocation] = useState<string>('')
    const basicCoords : geoCoords = {lat:0, long:0}
    const [locationCoords, setLocationCoords] = useState<geoCoords>(basicCoords)

    // const getLocationCoords = (location) =>{
    // //    find location and corresponding coordinates from json file
    //     return setLocationCoords({
    //         lat:countryCapitals[location].CapitalLatitude,
    //         long:countryCapitals[location].CapitalLongitude,
    //     }
    // })

    // const [loading, setLoading] = useState<boolean>(false)

    //API 2: WEATHER
    const initialWeather: Weather = {show: false, weather:'', temp:0, feelTemp:0, weatherIconSrc:''}
    const [allweather, setAllweather]=useState<Weather>(initialWeather)

    const getWeatherData = async () => {
        const result = await WeatherApi();
        setAllweather({
            show: true,
            weather: result.weather,
            feelTemp: result.feelTemp,
            temp: result.temp,
            weatherIconSrc:result.weather[0].id
        })
    }

    return(
        <>
            <h1>Hello!</h1>
            <article>
                <form>
                    <input placeholder='Type or select a capital city' id='citiesInput' name='cities' list='cities'
                           onBlur={(e)=>setLocation(e.target.value)}
                    />
                    <datalist id='cities'>
                        {allCapitals.map((item)=>{return <option value={item} key={item}/>})}
                    </datalist>
                </form>
                {/*<input placeholder='Type a capital city' onChange={(e)=>searchThrough(e)}/>*/}
            </article>
            <article style={{border:'1px solid black'}}>
                <h1>Weather box</h1>
                <button onClick={getWeatherData}>Show me some sunshine</button>

                {allweather.show === true &&
                    <>
                        <p>Weather is: {allweather.weather}</p>
                        <p>T: {allweather.temp}</p>
                        <p>feels like: {allweather.feelTemp}</p>
                        <p>{allweather.weatherIconSrc}</p>
                    </>
                }
            </article>
            <article>
                <button onClick={LocationPictures}>Pictures url</button>
            </article>
        </>
    )
}

export default ApiCalls