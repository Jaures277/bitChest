import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import currencySlice from "../slices/currency/currencySlice";
import walletSlice from "../slices/infoWallet/walletSlice";


export const store=configureStore({
    reducer:{
        auth:authSlice,
        currencies:currencySlice,
        walletinfo:walletSlice,
    },
})