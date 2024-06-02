import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";

const store=configureStore({
    reducer:{
        unreadNotifications:notificationReducer
    }
})

export default store