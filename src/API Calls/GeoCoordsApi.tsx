import axios from "axios";
import countryCapitals from '../countryCapitals.json'

//API 1: Input: city name. Output: geo coordinates and info (currency, language, flag?, info?)
//DB Geo API doesn't work :( use local object with capital names and geo coords instead.
//To suggest values as user types, create array of capitals:
let allCapitals:string[] = Object.keys(countryCapitals);
allCapitals = allCapitals.sort()

export type geoData = {
    lat:number,
    long:number,
    currency:string,
    flagUrl:string
}

const GetCoords = (locationTest:string) : [number, number] =>{
    // @ts-ignore
    let indexing: any =  countryCapitals[locationTest]
    let lat:number = indexing.CapitalLatitude
    let long:number = indexing.CapitalLongitude
    return [lat, long]
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

const GetCurrency = (locationTest:string) : any=> {
    // @ts-ignore
    let countryName:string = countryCapitals[locationTest].CountryName
    let currency: string;
    axios.get(`https://countriesnow.space/api/v0.1/countries/currency?country=${countryName}`)
        .then((res: any)=>{
            let allData:any = res.data.data
            for(let item in allData){
                if(allData[item].name === countryName){
                    console.log(allData[item].currency)
                    currency = allData[item].currency
                    return currency
                }
            }
        })
}

// export default GetCurrency

const GetFlag = (locationTest:string) :any => {
    // @ts-ignore
    let countryName:string = countryCapitals[locationTest].CountryName
    let flagUrl:string;
    axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images/q?country=${countryName}`)
        .then((res: any)=>{
            console.log(res.data.data.flag)
            flagUrl = res.data.data.flag
            return flagUrl
        })
}

const GeoDataApi = (locationTest:string) : geoData =>{
    let [lat, long] = GetCoords(locationTest)
    let currency = GetCurrency(locationTest)
    let flagUrl = GetFlag(locationTest)
    return{
        lat: lat,
        long:long,
        currency: currency,
        flagUrl: flagUrl
    }
}

export {allCapitals, GetCoords,GetCurrency, GetFlag, GeoDataApi}
