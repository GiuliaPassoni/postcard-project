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
    flagUrl:boolean,
    flagCode:any
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

const GetCurrency = async (locationTest:string) : Promise<any>=> {
    // @ts-ignore
    let countryName:string = countryCapitals[locationTest].CountryName
    let currency: string;
    return await axios.get(`https://countriesnow.space/api/v0.1/countries/currency?country=${countryName}`)
        .then((res: any)=>{
            let allData:any = res.data.data
            for(let item in allData){
                if(allData[item].name === countryName){
                    currency = allData[item].currency
                    return currency
                }
            }
        })
}

// export default GetCurrency

const GetFlag = async (locationTest:string) :Promise<any> => {
    // @ts-ignore
    let countryName:string = countryCapitals[locationTest].CountryName
    let flagUrl:boolean;
    return await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images/q?country=${countryName}`)
        .then((res: any) => {
            // flagUrl = res.data.data.flag
            flagUrl = true
            return flagUrl
        })
        .catch((err)=> {
            flagUrl = false
            return flagUrl
        });
}


const GetFlagCode = (locat:string):string => {
    // @ts-ignore
    let flagCode:any = countryCapitals[locat].CountryCode
    return flagCode
}

const GeoDataApi = async (locationTest:string) : Promise<geoData> =>{
    let [lat, long] = GetCoords(locationTest)
    let currency = await GetCurrency(locationTest)
    let flagUrl = await GetFlag(locationTest)
    let flagCode = GetFlagCode(locationTest)
    return{
        lat: lat,
        long:long,
        currency: currency,
        flagUrl: flagUrl,
        flagCode: flagCode
    }
}

export {allCapitals, GetCoords,GetCurrency, GetFlag, GeoDataApi}
