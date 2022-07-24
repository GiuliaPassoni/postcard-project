//API 3: pictures of the location
import axios from "axios";
import countryCapitals from '../countryCapitals.json'
import {allCapitals} from './GeoCoordsApi'

const locationTest:string = 'Amsterdam'

const photosApiKey : string | undefined  = process.env.REACT_APP_IMAGES_API

export type images = {
    url:string[],
    alt:string[],
    height:number[]
}

// let orientation:string='landscape'

const PicturesApi = (locationTest:string, orientation:string) : Promise<images> => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${locationTest}-city&orientation=${orientation}&client_id=${photosApiKey}&per_page=5`)
        .then((result)=>{
            let allData:any | undefined = result.data.results
            if(allData.length === 0){
                if (allCapitals.indexOf(locationTest) !== -1){
                    // @ts-ignore
                    return PicturesApi(countryCapitals[locationTest].CountryName)
                }else{
                    return {
                        url:[],
                        alt:[],
                        height:[]
                    };
                }
            }else{
                return {
                    url:(allData.map((item: { urls: { raw: string; }; }) => {return item.urls.raw+"&w=1500&dpr=2"})),
                    alt:allData.map((item: { alt_description: string; }) => {return item.alt_description}),
                    height:allData.map((item: { height: number; }) => {return item.height})
                };
            }
        })
}

export {PicturesApi}