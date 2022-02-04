import { configureStore } from '@reduxjs/toolkit'
import postReducer from './posts/postsSlice'
export const store = configureStore({
    reducer: {
        posts: postReducer
    },
})