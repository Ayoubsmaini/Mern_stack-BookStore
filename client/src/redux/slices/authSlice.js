import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users:null,
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
      loading:false,
     error:null
  },
  reducers:{
    login(state,action){
        state.user=action.payload
    },
    logout(state){
        state.user=null
    },
    setUsers(state,action){
        state.users = action.payload
    },
    setLoading(state,action){
        state.loading = action.payload
    },
    setError(state,action){
        state.error = action.payload
    }
  }
});

const authActions = authSlice.actions
const authReducer = authSlice.reducer
export {authActions,authReducer}