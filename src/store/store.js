import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
const store=configureStore({
    reducer:{
        auth: authSlice
    }
});

export default store
// we have made store for only login and logout as we want these functionalities all over the app...