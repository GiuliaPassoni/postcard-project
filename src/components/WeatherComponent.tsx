//API 2
import {Weather, WeatherApi, celsiusToFahrenheit, fahrenheitToCelsius} from "./../API Calls/WeatherApi";
import React, {useEffect, useState, useCallback} from "react";

import {Container, Grid} from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat';

import style from './../styling/weather.module.scss'

interface IWeatherProps {
    locat: any,
    lat: any,
    long: any
}

// export default function WeatherComponent(props:any){
export default function WeatherComponent({locat, lat, long}: IWeatherProps) {
    // console.log('props again', lat, long, locat)
    //API 2: WEATHER
    const initialWeather: Weather = {show: false, weather: '', temp: 0, feelTemp: 0, weatherIconSrc: ''}
    const [allweather, setAllweather] = useState<Weather>(initialWeather)
    const [unit, setUnit] = useState<string>('celsius')

    const getWeatherData = useCallback(
        async () => {
            // console.log(locat, lat, long, 'my props for weather')
            const result = await WeatherApi(lat, long);
            setAllweather({
                show: true,
                weather: result.weather,
                feelTemp: result.feelTemp,
                temp: result.temp,
                // weatherIconSrc:result.weather[0].id
                weatherIconSrc: result.weatherIconSrc
                // unit:'celsius'
            })
        },
        [locat, lat, long],
    );

    useEffect(() => {
        if (locat !== '') {
            getWeatherData()
        }
        // return () => ()
    }, [getWeatherData, locat]);

    return (
        <>
            {/*{allweather.show === true &&*/}
            <Container className={style.weatherSection}>
                <h4> The weather in {locat}</h4>
                <Grid className={style.dataContainer} container spacing={1} sx={{alignItems: 'center', justifyContent: 'center'}}>
                    <Grid item xs={12} sm={12} md={6} className={style.dataLeft}
                          sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={allweather.weatherIconSrc}
                             style={{
                                 display: 'inline',
                                 // boxShadow: '0 0 5px 5px silver',
                                 backgroundColor: '#ecd1b6',
                                 borderRadius: '50%',
                                 width: '50px',
                                 height: '50px',
                                 margin: '.5rem'
                             }}
                        />
                        <p style={{display: 'inline'}}>{allweather.weather}</p>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={style.dataRight}>
                        {/*<div>*/}
                        {unit === 'celsius' ?
                            <Grid container direction='row'
                                  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Grid item>
                                    <p><ThermostatIcon/> {allweather.temp} &#176;C</p>
                                    <p>feels like {allweather.feelTemp} &#176;C</p>
                                </Grid>
                                <button
                                    // style={{border:'none', backgroundColor:'rgb(228 192 155)', borderRadius:'50%', padding:'.5rem', marginLeft:'.5rem'}}
                                    style={{border:'none', backgroundColor:'white', borderRadius:'50%', padding:'.5rem', marginLeft:'.5rem'}}
                                        onClick={() => setUnit('fahrenheit')}> &#176;F</button>
                            </Grid>
                            : <Grid container direction='row'
                                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Grid item>
                                    <p><ThermostatIcon/> {celsiusToFahrenheit(allweather.temp)} &#176;F</p>
                                    <p>feels like {celsiusToFahrenheit(allweather.feelTemp)} &#176;F</p>
                                </Grid>
                                <button
                                    style={{border:'none', backgroundColor:'white', borderRadius:'50%', padding:'.5rem', marginLeft:'.5rem'}}
                                    onClick={() => {
                                        fahrenheitToCelsius(allweather.temp)
                                        fahrenheitToCelsius(allweather.feelTemp)
                                        setUnit('celsius')
                                    }}> &#176;C
                                </button>
                            </Grid>
                        }
                        {/*</div>*/}
                    </Grid>
                </Grid>


            </Container>
            {/*}*/}
        </>
    )
}