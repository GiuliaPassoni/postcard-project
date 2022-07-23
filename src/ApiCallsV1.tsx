import React, {useState, useEffect} from 'react'
//"API" 1
import {allCapitals, geoData, GeoDataApi} from "./API Calls/GeoCoordsApi";

import WeatherComponent from './components/WeatherComponent';
import PicturesComponent from "./components/PicturesComponent";

const ApiCallsV1=()=>{
    //API1: LOCATION
    // const [loading, setLoading] = useState<boolean>(false)
    const [noLocationError, setNoLocationError] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const zeroGeo: geoData = {lat:0, long:0, currency:'', flagUrl:''}
    const [geoInfo, setGeoInfo] = useState<geoData>(zeroGeo)
    const getGeoInfo = async(location:string)=>{
        if(allCapitals.indexOf(location) >-1){
        let response = await GeoDataApi(location);
            setGeoInfo({
                lat:response.lat,
                long:response.long,
                currency:response.currency,
                flagUrl:response.flagUrl
            })
        }else{
            setNoLocationError('Ops! We are a bit lost here...')
        }

    }

    useEffect(() => {
        if(location!==''){
            getGeoInfo(location)
        }else if(allCapitals.indexOf(location) ===-1 && location!==''){

        }
        return () => setNoLocationError('')
    }, [location]);

    return(
        <>
            <h1>Hello!</h1>
            <article>
                <form>
                    <input placeholder='Type or select a capital city' id='citiesInput' name='cities' list='cities'
                           onBlur={(e)=> {
                               e.preventDefault();
                               setLocation(e.target.value);
                           }}
                    />
                    <datalist id='cities'>
                        {allCapitals.map((item)=>{return <option value={item} key={item}/>})}
                    </datalist>
                </form>
            </article>
            {noLocationError==='' &&
                <article style={{border:'1px solid black'}}>
                <WeatherComponent locat={location} lat={geoInfo['lat']} long={geoInfo['long']}/>
                <PicturesComponent locat={location}/>
            </article> }
            {noLocationError!=='' && noLocationError}
        </>
    )
}

export default ApiCallsV1