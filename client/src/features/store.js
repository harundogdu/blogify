import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "services/postsApi";
import authReducer from "features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(postApi.middleware),
});
