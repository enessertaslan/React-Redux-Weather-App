import {configureStore} from '@reduxjs/toolkit';
import  weatherSLice  from './weather/weatherSlice';
export const store=configureStore({
    reducer:{
        weather:weatherSLice,
    },
})