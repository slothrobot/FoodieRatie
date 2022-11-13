import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'user/register',
    async({username, email, password}, {rejectWithValue})=>{
        try{
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                '/api/user/register',
                {username, email, password},
                config
            )
        }catch(error){
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async({email, password}, {rejectWithValue})=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.post(
                '/api/user/login',
                {email, password},
                config
            )
            localStorage.setItem('userToken',data.userToken)
            return data
        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()
        // configure authorization header with user's token
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
        const { data } = await axios.get('/api/user/profile', config)
        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

const userToken = localStorage.getItem('userToken')
    ?localStorage.getItem('userToken')
    :null

const initialState = {
    loading: false,
    userInfo: {},
    userToken,
    error: null,
    success: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = null
          },
    },
    extraReducers:{
        [registerUser.pending]: (state)=>{
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state)=>{
            state.loading = false
            state.success = true
        },
        [registerUser.rejected]: (state, {payload})=>{
            state.loading = false
            state.error = payload
        },
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userToken = payload.userToken
            state.userInfo =  payload
            state.success = true
        },
        [userLogin.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.success = true
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },
    },
})

export const { logout } = userSlice.actions
export default userSlice.reducer