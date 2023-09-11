import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "../../../services/Currency/Currency";

export const getcurrency = createAsyncThunk('currencies/get', async (thunkAPI) => {
    try {
        const response = await getCurrencies();
        console.log("response",response)

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({
            isError: true,
            message: (error.response && error.response.data && error.response.data.message) ||
                     error.message ||
                     error.toString()
        });
    }
})

const initialState = {
    currencies: [],
    isError: false,
    message: '',
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        clearError: (state) => {
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: {
        [getcurrency.pending]: () => {
            console.log("pennding");
        },
        [getcurrency.fulfilled]: (state, { payload }) => {
            console.log("fulfield");
            console.log(state.currencies.data)
            return {...state, currencies:payload}
        },
        [getcurrency.rejected]: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
    }
})
export default currencySlice.reducer;