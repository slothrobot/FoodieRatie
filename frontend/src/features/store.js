import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./User/userSlice";
import foodReducer from "./Foods/foodSlice";

export const store = configureStore({
    reducer:{
        //tell the store to use this slice reducer function to handle all updates to that state
        foods: foodReducer,
        user: userReducer,
    },
});