import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export  const getCharacters = createAsyncThunk("characters/getCharacters", async(page) => {
    const res = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/character/?page=${page}`)
    return res.data;
    
})

export const singleCharacter = createAsyncThunk("characters/singleCharacter", async(id) => {
    const res = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/character/${id}`)
    return res.data
})

export const characterSlice = createSlice({
    name: "characters",
    initialState: {
        items : [],
        status:"idle",
        error: null,
        page: 1,
        item:  null,
    },
    reducers : {
        nextPage: (state,action)  => {
            state.page ++
            
        },
        prevPage: (state,action) => {
            state.page >1 && state.page --
        }
    },
    extraReducers : (builder) =>  {
        builder
        //get data
        .addCase(getCharacters.pending,(state,action) => {
            state.status = "loading"
        })
        .addCase(getCharacters.fulfilled,(state,action) => {
            state.items = action.payload
            state.status = "succeeded"
            
        })
        .addCase(getCharacters.rejected,(state,action) => {
            state.status = "failed"
            state.error  = action.error.message
        })
        //get single data
        .addCase(singleCharacter.pending,(state,action) => {
            state.status = "loading"
        })
        .addCase(singleCharacter.fulfilled,(state,action) => {
            state.item = action.payload
            state.status = "succeeded"
        })
        .addCase(singleCharacter.rejected,(state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})
export const {nextPage,prevPage} = characterSlice.actions
export default characterSlice.reducer;