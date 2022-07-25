import React, {useState, useEffect} from 'react'
//"API" 1
import {allCapitals, geoData, GeoDataApi} from "./API Calls/GeoCoordsApi"
import ReactCountryFlag from "react-country-flag"
//API 2 AND 3
import WeatherComponent from './components/WeatherComponent'
import PicturesComponent from "./components/PicturesComponent"
//styling
import style from './styling/mainPage.module.scss'
import {Container, Stack} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import SearchIcon from '@mui/icons-material/Search'

const ApiCallsV1 = () => {
    //API1: LOCATION
    // const [loading, setLoading] = useState<boolean>(false)
    //to allow reset of input field on click
    const [typingValue, setTypingValue] = useState<string>('')
    //to display error if no location is found
    const [noLocationError, setNoLocationError] = useState<string>('')
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
    const width: any = window.innerWidth;
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        if (width > 600) {
            setOrientation('landscape')
        } else {
            setOrientation('portrait')
        }
        if (location !== '') {
            getGeoInfo(location)
        }
        return () => {
            setNoLocationError('')

        }
    }, [location, width]);

    // const movingCloudsClass = location === '' ? 'clouds' : '';

    return (
        <Container
            // className={movingCloudsClass}
            className={style.containerAll}
            maxWidth='lg'
            sx={{
                display: 'flex', flexDirection: 'column'
            }}>
            {/*<header style={{color:'#6db4f2'}}>*/}

            <header>
                <h1>Postcard DayDreaming</h1>
                <h3>A souvenir from your daydreams </h3>
            </header>
            <main>
                <section className={style.intro}>
                    <p>Input or select a capital city:</p>
                    <form
                        className={style.introForm}
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLocation(typingValue)
                        }}>
                        <div className={style.cabbageClass}>
                            <input placeholder='e.g. Amsterdam'
                                   id='citiesInput' name='cities' list='cities'
                                   value={typingValue}
                                   onChange={(e) => setTypingValue(e.target.value)}
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
                            <button className={style.aButton}>< SearchIcon/></button>
                        </div>
                        <datalist id='cities'>
                            {allCapitals.map((item) => {
                                return <option value={item} key={item}/>
                            })}
                        </datalist>
                    </form>
                </section>

                {location === '' &&
                    <div className={style.cloudId}>
                        <div className={style.cloud}></div>
                        <div className={style.cloud}></div>
                        <div className={style.cloud}></div>
                        <div className={style.cloud}></div>
                        <div className={style.cloud}></div>
                    </div>}

                {noLocationError === '' &&
                    location !== '' &&
                    <>
                        <section className={style.geoInfo}>
                            <Stack direction='row' spacing={2}>
                                {geoInfo.flagUrl &&
                                    <>
                                        <ReactCountryFlag countryCode={geoInfo['flagCode']}/>
                                    </>}
                                {geoInfo.currency !== '' && geoInfo.currency !== undefined &&
                                    <p>Currency: {geoInfo.currency}</p>}
                            </Stack>
                        </section>

                        <WeatherComponent locat={location} lat={geoInfo['lat']} long={geoInfo['long']}/>

                        <PicturesComponent locat={location} orientation={orientation}/>

                    </>
                }
                {noLocationError !== '' && noLocationError &&
                    <div id="clouds">
                        <div className="cloud"></div>
                        <div className="cloud"></div>
                        <div className="cloud"></div>
                        <div className="cloud"></div>
                        <div className="cloud"></div>
                    </div>
                }
            </main>
            <footer>
                {/*<p className={style.socials}><GitHubIcon /></p>*/}
                <p className={style.myCp}>&copy; Giulia Passoni 2022
                    {/*<a                     href='https://github.com/GiuliaPassoni'><GitHubIcon/></a>*/}
                </p>
                {/*<p className={style.others}> CSS Animation credits: <a*/}
                {/*    href='https://codepen.io/geenah/pen/pVXvgK'>Gina</a></p>*/}
            </footer>
        </Container>
    )
}

export default ApiCallsV1