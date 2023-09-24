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


export const updateUser = createAsyncThunk('auth/updateUser', async (id, userData, thunkAPI) => {
    try {
        // Envoyez la requête HTTP pour mettre à jour les informations de l'utilisateur
        const response = await updateUser(id, userData);

        // Mettez à jour les informations de l'utilisateur dans le stockage local ou d'une manière appropriée
         //setAccesTokenStorage(response.data);
         console.log(response.data, 'reeeeeeeeeeeeeep')

        return response.data; // ou les données mises à jour de l'utilisateur
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

        // ...
        [updateUser.pending]: () => {
            console.log("Updating user information - pending");
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            console.log("Updating user information - fulfilled");
            // Mettez à jour l'état de l'utilisateur avec les nouvelles données
            return { ...state, user: payload };
        },
        [updateUser.rejected]: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },

    }
    
})
export default authSlice.reducer;