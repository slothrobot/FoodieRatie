import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FoodApi from '../../common/APIs/OpenFoodApi';
// import {USER_ID,PASSWORD } from '../../common/APIs/ApiKeyToWrite';

export const fetchAsyncFoods = createAsyncThunk('foods/fetchAsyncFoods', 
async (keywords)=>{

        const response = await FoodApi
        // s stands for search, the search function will be added later
        .get(`cgi/search.pl?action=process&json=true&tag_contains_0=contains&tagtype_0=categories&tag_0=${keywords}`)
        .catch((err)=>{
            console.log('Err: ', err);
        });
        return response.data;
});

export const fetchAsyncDrinks = createAsyncThunk('foods/fetchAsyncDrinks', 
async (keywords)=>{

        const response = await FoodApi
        // s stands for search, the search function will be added later
        .get(`cgi/search.pl?action=process&json=true&tag_contains_0=contains&tagtype_0=categories&tag_0=${keywords}`)
        .catch((err)=>{
            console.log('Err: ', err);
        });
        return response.data;
});

export const fetchAsyncDetails = createAsyncThunk('foods/fetchAsyncDetails', 
async (_id)=>{
        const response = await FoodApi
        .get(`api/v2/product/${_id}`)
        .catch((err)=>{
            console.log('Err: ', err);
        });
        return response.data;
});

const initialState = {
    foods:{},
    drinks:{},
    details:{},
};

const foodSlice = createSlice({
    name:'foods',
    initialState,
        reducers:{
            //this clean-up is not an async action creator, so put it here
            removeDetails: (state)=>{
                state.details ={};
            },
            //the following addFoods is no longer used since I am now using thunk and extrareducers now
            //add the action creator with the initial state and payload
            addFoods: (state, { payload }) =>{
                //update the property I want to update
                state.foods = payload;
            }
        },
        extraReducers:{
            //my async action creators
            [fetchAsyncFoods.pending]: ()=>{
                console.log("Pending");
            },
            [fetchAsyncFoods.fulfilled]: (state,{payload})=>{
                console.log("Fetched Successfully!");
                return {...state, foods: payload};
            },
            [fetchAsyncFoods.rejected]: ()=>{
                console.log("Rejected");
            },
            [fetchAsyncDrinks.fulfilled]: (state, {payload})=>{
                console.log("Fetched Drinks Successfully!");
                return {...state, drinks: payload};
            },
            [fetchAsyncDetails.fulfilled]: (state, {payload})=>{
                console.log("Fetched Details Successfully!");
                return {...state, details: payload};
            }
        },
});

//the slice is created, let's export the generated redux action creators
export const {addFoods} = foodSlice.actions;
export const {removeDetails} = foodSlice.actions;
//also export the reducer function for the whole slice
export default foodSlice.reducer;
//fetch a value from the store
//state.foods.foods : the first `foods` is the name of the reducer, the second one is the property of the state
export const getAllFoods = (state) => state.foods.foods;
export const getAllDrinks = (state) => state.foods.drinks;
export const getAllDetails = (state) => state.foods.details;