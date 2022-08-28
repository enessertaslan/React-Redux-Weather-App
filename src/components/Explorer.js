
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {getWeather}  from '../redux/weather/weatherSlice.js'
import './index.css'
import { Cities } from '../redux/weather/weatherSlice.js'
import { nanoid } from 'nanoid'
import Test from '../img/clear-day.png'

const getDayName=(date = new Date(),locale='en-US')=>{
    return date.toLocaleDateString(locale,{weekday:'long'})
}

function Explorer() {
    const dispatch=useDispatch()
    const weather=useSelector(state=>state.weather.items);
    const isLoading=useSelector(state=>state.weather.isLoading)
    const currentWeather=weather.currentConditions;
    const [selectedCity,setSelectedCity]=useState('Adana');
    useEffect(()=>{
        dispatch(getWeather(selectedCity)) 
    },[dispatch,selectedCity])
    console.log('Weather',weather,'Current Weather',currentWeather)
    
    if(isLoading)
    {
        return 'Loading....';
    }
    const weatherDays=weather.days.slice(0,5);
  return (
    <>
    <h1 className='header'>Weather App</h1>
    <div className='city-container'>
        <select name="" id=""  onChange={(e)=>setSelectedCity(e.target.value)}>
            {Cities.map((e)=>(
                <option key={e.id} value={e.name}>{e.name}</option>
            ))}
        </select>
    </div>
    <div className='explorer-container'>
        <div className='weather-location'>
           {selectedCity}
        </div>
        <div className='weather-first-row'>
            <div className='weather-info'>
                 <img src={require(`../img/${currentWeather.icon}.png`)} alt="" />
                 <p>{currentWeather.conditions}</p>
                 
            </div>
            <div className='weather-heat'>
            
                {Math.floor(currentWeather.temp)}C°
            </div>
            <div className='weather-specs'>
                Wind: {currentWeather.windspeed} kph <br />
                Precip: {currentWeather.precip} mm <br />
                Pressure: {currentWeather.pressure} mb
            </div>
        </div>
        <div className="weather-second-row">
            {
                isLoading ? 'Loading...' : weatherDays.map((data)=>(
                    
                    <div className='weather-days' key={nanoid()}>
                    <div>{getDayName(new Date(data.datetime))}</div>
                    <div><img src={require(`../img/${data.icon}.png`)}  width={'85px'} alt="" /></div>
                    <div>{Math.floor(data.tempmax)}</div>
                </div>
                ))
              
            }
            
           
        </div>
    </div>
    </>
  )
}

export default Explorer