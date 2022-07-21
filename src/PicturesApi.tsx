//API 3: pictures of the location
import axios from "axios";
import countryCapitals from './countryCapitals.json'
import {allCapitals} from './GeoCoords'

const locationTest:string = 'Amsterdam'

const photosApiKey : string | undefined  = process.env.REACT_APP_IMAGES_API

export type images = {
    url:string[],
    alt:string[],
    height:number[]
}

let orientation:string='landscape'
const PicturesApi = (locationTest:string) : Promise<images> => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${locationTest}&orientation=${orientation}&count=5&client_id=${photosApiKey}&per_page=3`)
        .then((result)=>{
            let allData:any | undefined = result.data.results
            if(allData.length === 0){
                console.log('no pictures')
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
                console.log('picture pass')
                return {
                    url:(allData.map((item: { urls: { raw: string; }; }) => {return item.urls.raw+"&w=1500&dpr=2"})),
                    alt:allData.map((item: { alt_description: string; }) => {return item.alt_description}),
                    height:allData.map((item: { height: number; }) => {return item.height})
                };
            }
        })
}

export default PicturesApi