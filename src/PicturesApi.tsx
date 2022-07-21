//API 3: pictures of the location
import axios from "axios";

const locationTest:string = 'Amsterdam'

const photosApiKey : string | undefined  = process.env.REACT_APP_IMAGES_API

export type images = {
    url:string[],
    alt:string[],
    height:number[]
}

let orientation:string='landscape'
const PicturesApi = (locationTest:string) => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${locationTest}&orientation=${orientation}&count=3&client_id=${photosApiKey}&per_page=3`)
        .then((result)=>{
            let allData:any | undefined = result.data.results
            console.log('picture pass')
            return {
                url:(allData.map((item: { urls: { raw: string; }; }) => {return item.urls.raw+"&w=1500&dpr=2"})),
                alt:allData.map((item: { alt_description: string; }) => {return item.alt_description}),
                height:allData.map((item: { height: number; }) => {return item.height})
            };
        })
}

export default PicturesApi