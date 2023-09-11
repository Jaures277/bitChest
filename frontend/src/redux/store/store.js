import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import currencySlice from "../slices/currency/currencySlice";


export const store=configureStore({
    reducer:{
        auth:authSlice,
        currencies:currencySlice,
    },
})