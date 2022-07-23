import {allCapitals, geoData, GeoDataApi} from "./../API Calls/GeoCoordsApi";
import {useCallback, useEffect, useState} from "react";

type TGeoProps={
    locat:any
}

export default function LocationComponent({locat}:TGeoProps){
    const zeroGeo: geoData = {lat:0, long:0, currency:'', flagUrl:''}
    const [geoInfo, setGeoInfo] = useState<geoData>(zeroGeo)
    const getGeoInfo = useCallback(
        async () => {
            console.log(locat)
            let response = await GeoDataApi(locat);
            setGeoInfo({
                lat:response.lat,
                long:response.long,
                currency:response.currency,
                flagUrl:response.flagUrl
            })
        },
        [locat],
    );


    useEffect(() => {
        if(locat!==''){
            getGeoInfo()
        }else if(allCapitals.indexOf(locat) ===-1){

        }else if(locat===''){

        }
        // return () => setLocation('')
    }, [locat]);
    return(
        <>
        <h1>hi!</h1>
        </>
    )
}