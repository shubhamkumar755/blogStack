import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{ 
        //login and logout here can also be called as actions
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },
        logout:(state)=>{ //as we dont action here so we havent written here
            state.status=false
            state.userData=null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer

