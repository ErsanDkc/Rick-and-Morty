import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export  const getCharacters = createAsyncThunk("characters/getCharacters", async() => {
    const res = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/character`)
    return res.data;
    
})

export const characterSlice = createSlice({
    name: "characters",
    initialState: {
        items : [],
        isLoading:false,
        error: null
    },
    reducers : {},
    extraReducers : (builder) =>  {
        builder
        //get data
        .addCase(getCharacters.pending,(state,action) => {
            state.isLoading = true
        })
        .addCase(getCharacters.fulfilled,(state,action) => {
            state.items = action.payload
            state.isLoading = false
        })
        .addCase(getCharacters.rejected,(state,action) => {
            state.isLoading = false
            state.error  = action.error.message
        })
    }
})
export default characterSlice.reducer;