import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../../services/Auth/Auth";
import { getAccessTokenFromLocalStorage, setAccesTokenStorage } from "../../../utilities";

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const response = await loginUser(user);
        console.log("response",response)
         setAccesTokenStorage(response.data)

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
    user: getAccessTokenFromLocalStorage('accessToken') ? getAccessTokenFromLocalStorage('accessToken') : null,
    isError: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'auth',
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
        logout: (state) => {
            state.user = null;
            //Cookies.remove('jwt');
            // Vous pouvez également supprimer l'accessToken du stockage local ici si nécessaire.
        },
    },
    extraReducers: {
        [login.pending]: () => {
            console.log("pennding");
        },
        [login.fulfilled]: (state, { payload }) => {
            console.log("fulfield");
            return {...state, user:payload} 
        },
        [login.rejected]: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
    }
})
export default authSlice.reducer;