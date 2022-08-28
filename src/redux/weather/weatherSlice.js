import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import CityList from '../../api/cities_of_turkey.json'

const api={
    key:"54NH5WE5U7RQKX2HVSUGRH33S",
    base:"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
}
export const Cities=CityList.map((e)=>{
    return e;
})
export const getWeather=createAsyncThunk('weather/getWeather' , async (city)=>{
    city=city.replace('Ğ','g')
    .replace('Ü','u')
    .replace('Ş','s')
    .replace('I','i')
    .replace('İ','i')
    .replace('Ö','o')
    .replace('Ç','c')
    .replace('ğ','g')
    .replace('ü','u')
    .replace('ş','s')
    .replace('ı','i')
    .replace('ö','o')
    .replace('ç','c');
    const res=await fetch(`${api.base}${city}?unitGroup=metric&key=${api.key}&contentType=json`)
    
    return res.json()
})

export const weatherSlice=createSlice({
    name:'weather',
    initialState:{
        items:[],
        cities:[],
        selectedCity:'',
        isLoading:true,

    },
    reducers:{

    },extraReducers:{
        [getWeather.fulfilled]:(state,action)=>
        {
            state.items=action.payload;
            state.isLoading=false;
        }
    }
})

export default weatherSlice.reducer;