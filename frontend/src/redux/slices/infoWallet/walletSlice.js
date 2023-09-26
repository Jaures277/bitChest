import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInfoWallet } from "../../../services/Dealing/Dealing";

export const getinfowallet = createAsyncThunk('wallet/get', async (thunkAPI) => {
    try {
        const response = await getInfoWallet();

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
    walletinfo: [],
    isError: false,
    message: '',
}

export const walletSlice = createSlice({
    name: 'walletclient',
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
        [getinfowallet.pending]: () => {
            console.log("pennding");
        },
        [getinfowallet.fulfilled]: (state, { payload }) => {
            console.log("fulfield");
            console.log(state.walletinfo.data)
            return {...state, walletinfo:payload}
        },
        [getinfowallet.rejected]: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
    }
})
export default walletSlice.reducer;