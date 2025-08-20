import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api/api';
// const { jwtDecode } = require('jwt-decode');



export const loginU = createAsyncThunk(
    "auth/login",
    async(Credential, {fulfillWithValue, rejectWithValue}) => {
        console.log(Credential)
        try{
            const {data} = await api.post("/auth/login", Credential);
            console.log(data)

            return fulfillWithValue(data);

        }catch(err){
            return rejectWithValue(err.response.data)

        }
    }
)



export const userReducer = createSlice({
    name:"user",
    initialState: {
        loader: false,
    },
    // reducers: {

    // },
    extraReducers: (builder) => {

        builder.addCase(loginU.pending, (state) => {
            state.loader = true;
        })
        .addCase(loginU.fulfilled, (state, action) => {
            state.loader = false;
            // Here you can handle the successful login response
            console.log("Login successful:", action);
        })
        .addCase(loginU.rejected, (state, action) => {
            state.loader = false;
            // Here you can handle the error response
            console.log("Login failed:", action);
        });

    }

})



export default userReducer.reducer;