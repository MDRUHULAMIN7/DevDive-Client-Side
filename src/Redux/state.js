import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "../Features/Users/UsersSlices";

 export const store = configureStore({

    reducer:{
        users:UsersReducer,
    },
});

export default store;