import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from './slice/FilterSlice'

const store = configureStore({
    reducer: {
        filter : FilterReducer
    },
});

export default store;
