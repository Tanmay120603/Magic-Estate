import { createSlice } from "@reduxjs/toolkit";

const initialState=0

const notificationSlice=createSlice({name:"notificationCount",initialState,reducers:{
    setCount(state,action){
        return action.payload
    },
    decreaseCount(state,action){
        return state-action.payload
    },
    increaseCount(state,action){
        return state+action.payload
    }
}})

export const {setCount,decreaseCount,increaseCount}=notificationSlice.actions

export default notificationSlice.reducer