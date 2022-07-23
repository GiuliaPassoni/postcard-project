import React, {useState, useEffect} from 'react'
//"API" 1
import {allCapitals, geoData, GeoDataApi} from "./API Calls/GeoCoordsApi";
//API 2
import {Weather, WeatherApi, celsiusToFahrenheit, fahrenheitToCelsius} from "./API Calls/WeatherApi";
//API 3
import {PicturesApi,images} from "./API Calls/PicturesApi";
//Carousel
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ApiCalls=()=>{
    //API1: LOCATION
    const [location, setLocation] = useState<string>('')
    const zeroGeo: geoData = {lat:0, long:0, currency:'', flagUrl:''}
    const [geoInfo, setGeoInfo] = useState<geoData>(zeroGeo)
    const getGeoInfo = async(location:string)=>{
        console.log(location)
        let response = await GeoDataApi(location);
        setGeoInfo({
            lat:response.lat,
            long:response.long,
            currency:response.currency,
            flagUrl:response.flagUrl
        })
    }
    // const [loading, setLoading] = useState<boolean>(false)

    //API 2: WEATHER
    const initialWeather: Weather = {show: false, weather:'', temp:0, feelTemp:0, weatherIconSrc:''}
    const [allweather, setAllweather]=useState<Weather>(initialWeather)

    const getWeatherData = async () => {
        const result = await WeatherApi(geoInfo['lat'],geoInfo["long"]);
        setAllweather({
            show: true,
            weather: result.weather,
            feelTemp: result.feelTemp,
            temp: result.temp,
            weatherIconSrc:result.weather[0].id
        })
    }
    // //API 3: PICTURES
    const initialPictures : images = {url:[], alt:[], height:[]}
    const [pictures, setPictures] = useState<images>(initialPictures)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const getPictures = async () => {
        console.log('pictures pass')
        const result = await PicturesApi(location);
        if (result.url.length > 0){
            setPictures({
                url:result.url,
                alt:result.alt,
                height:result.height
            })
        }else{
            setErrorMessage('So sad! No pictures found :(')
        }
    }

    let renderedImages = [];
    for (let i=0; i<pictures.url.length; i++) {
        const e =
            <div>
                <img alt={pictures.alt[i]} key={i} src={pictures.url[i]} loading='lazy'/>
            </div>
        renderedImages.push(e)
    }
    let renderedImagesUrls:string[] = [];
    for (let i=0; i<pictures.url.length; i++) {
        const e = pictures.url[i]
        renderedImagesUrls.push(e)
    }

    useEffect(() => {
        if(location!==''){
            getGeoInfo(location)
            getWeatherData()
            getPictures()
        }else if(allCapitals.indexOf(location) ===-1){

        }else if(location===''){

        }
        // return () => setLocation('')

    }, [location]);


    return(
        <>
            <h1>Hello!</h1>
            <article>
                <form>
                    <input placeholder='Type or select a capital city' id='citiesInput' name='cities' list='cities'
                           onBlur={(e)=> {
                               console.log(e.target.value)
                               e.preventDefault();
                               setLocation(e.target.value);
                           }}
                    />
                    <datalist id='cities'>
                        {allCapitals.map((item)=>{return <option value={item} key={item}/>})}
                    </datalist>
                </form>
                {/*<input placeholder='Type a capital city' onChange={(e)=>searchThrough(e)}/>*/}
            </article>
            <article style={{border:'1px solid black'}}>
                {/*<button onClick={getWeatherData}>Show me some sunshine</button>*/}
                {allweather.show === true &&
                    <>
                        {/*WEATHER*/}
                        <div>
                            <h1>Weather box</h1>
                            <p>Weather is: {allweather.weather}</p>

                            <p>T: {allweather.temp} <button onClick={()=>celsiusToFahrenheit(allweather.temp)}> C</button></p>
                            <p><button onClick={()=>fahrenheitToCelsius(allweather.temp)}>F</button></p>
                            {/*<p>feels like: {allweather.feelTemp}</p>*/}
                            <p>{allweather.weatherIconSrc}</p>
                        </div>
                        {/*CAROUSEL*/}
                        <div >
                            {/*<button onClick={getPictures}>Some pictures here</button>*/}
                            {/*{renderedImages}*/}
                            {errorMessage === '' &&
                            <Carousel >
                                {renderedImagesUrls.map((i, ix:number) => {return  <div>
                                        <img key={i} src={renderedImagesUrls[ix]} alt='' />
                                    </div>
                                })}
                            </Carousel>}
                            {errorMessage !== '' && errorMessage}
                        </div>
                    </>
                }
            </article>
        </>
    )
}

export default ApiCalls