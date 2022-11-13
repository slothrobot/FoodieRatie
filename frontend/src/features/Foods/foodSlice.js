import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FoodApi from '../../common/APIs/OpenFoodApi';

export const fetchAsyncFoods = createAsyncThunk('foods/fetchAsyncFoods', 
async (keywords)=>{
        const [keyword, page] = keywords;
        const response = await FoodApi
        .get(`cgi/search.pl?json=true&action=process&sort_by=unique_scans_n&page_size=20&search_terms=${keyword}&page=${page}`)
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
            removeFoodList: (state)=>{
                state.foods = {};
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
            [fetchAsyncDetails.fulfilled]: (state, {payload})=>{
                console.log("Fetched Details Successfully!");
                return {...state, details: payload};
            }
        },
    });

//the slice is created, let's export the generated redux action creators
export const {addFoods} = foodSlice.actions;
export const {removeDetails} = foodSlice.actions;
export const {removeFoodList} = foodSlice.actions;
//also export the reducer function for the whole slice
export default foodSlice.reducer;
//fetch a value from the store
//state.foods.foods : the first `foods` is the name of the reducer, the second one is the property of the state
export const getAllFoods = (state) => state.foods.foods;
export const getAllDetails = (state) => state.foods.details;