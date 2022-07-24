import React, {useState, useEffect} from 'react'

import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import {Box, Button, Container, Typography, Stack} from '@mui/material'
//"API" 1
import {allCapitals, geoData, GeoDataApi} from "./API Calls/GeoCoordsApi";
import ReactCountryFlag from "react-country-flag";

import WeatherComponent from './components/WeatherComponent';
import PicturesComponent from "./components/PicturesComponent";

const ApiCallsV1 = () => {
    //API1: LOCATION
    // const [loading, setLoading] = useState<boolean>(false)
    //to allow reset of input field on click
    const [typingValue, setTypingValue] = useState<string>('')
    //to display error if no location is found
    const [noLocationError, setNoLocationError] = useState<string>('')
    const [noFlagError, setNoFlagError] = useState<string>('')
    //to set the location
    const [location, setLocation] = useState<string>('')
    //skeleton to hold the location info
    const zeroGeo: geoData = {lat: 0, long: 0, currency: '', flagUrl: true, flagCode: ''}
    //to hold the updated location info
    const [geoInfo, setGeoInfo] = useState<geoData>(zeroGeo)
    //calling the geo API
    const getGeoInfo = async (location: string) => {
        if (allCapitals.indexOf(location) > -1) {
            let response = await GeoDataApi(location);
            setGeoInfo({
                lat: response.lat,
                long: response.long,
                currency: response.currency,
                flagUrl: response.flagUrl,
                flagCode: response.flagCode
            })
        } else {
            setNoLocationError('Ops! We are a bit lost here...')
        }

    }

    //set orientation param:
    const width:any = window.innerWidth;
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        if(width>600){
            setOrientation('landscape')
        }else{
            setOrientation('portrait')
        }
        if (location !== '') {
            getGeoInfo(location)
        }
        return () => {
            setNoLocationError('')

        }
    }, [location]);

    return (
        <Container maxWidth='lg' sx={{
            display: 'flex', flexDirection: 'column',
            // backgroundColor: '#100a9b',
            // backgroundImage: 'linear-gradient(0deg, #100a9b 0%, #e975a8 74%)'
        }}>
            {/*<header style={{color:'#6db4f2'}}>*/}
            <header style={{ color: '#2d3784'}}>
                <h1>Postcard DayDreaming</h1>
                <h3 style={{fontStyle: 'italic'}}>A souvenir from your daydreams </h3>
            </header>
            <main>
                <section className='introForm'>
                    <p>Input or select a capital city:</p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLocation(typingValue)
                        }}
                        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {/*<label htmlFor='cities'>Input or select a capital city</label>*/}
                        <input placeholder='Type or select a capital city'
                               id='citiesInput' name='cities' list='cities'
                               value={typingValue}
                               onChange={(e) => setTypingValue(e.target.value)}
                               style={{
                                   display: 'inline',
                                   padding: '.5rem',
                                   borderRadius: '5px',
                                   border: 'none',
                                   boxShadow: '0 0 5px 5px silver',
                                   margin: '1 rem'
                               }}
                               onClick={(e) => {
                                   setLocation('')
                                   setTypingValue('')
                                   // e.target.reset()
                               }}
                               onBlur={(e) => {
                                   e.preventDefault();
                                   setLocation(e.target.value);
                               }}
                        />
                        <datalist id='cities'>
                            {allCapitals.map((item) => {
                                return <option value={item} key={item}/>
                            })}
                        </datalist>
                    </form>
                </section>
                {noLocationError === '' &&
                    location !== '' &&
                    <>
                        <section className='geoInfo' style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            marginTop: '1.5rem',
                            padding: '.5rem'
                        }}>
                            <Stack direction='row' spacing={2}>
                                {geoInfo.flagUrl &&
                                    <>
                                        <ReactCountryFlag countryCode={geoInfo['flagCode']}
                                                          style={{transform: 'scale(2.5)'}}/>
                                    </>}
                                {geoInfo.currency !== '' && <p>Currency: {geoInfo.currency}</p>}
                            </Stack>
                        </section>

                            <WeatherComponent locat={location} lat={geoInfo['lat']} long={geoInfo['long']}/>

                            <PicturesComponent locat={location} orientation={orientation}/>

                    </>
                }
                {noLocationError !== '' && noLocationError}
            </main>
            <footer>
                <p>&copy; Giulia Passoni 2022</p>
            </footer>
        </Container>
    )
}

export default ApiCallsV1