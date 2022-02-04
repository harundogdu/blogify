import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "services/postService";

export const getAllPostsFromDB = createAsyncThunk("posts/getAllPostsFromDB", async () => {
    const posts = await postService(`/posts`);
    return posts;
});

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        /* getFromAllPostsFromDB */
        builder.addCase(getAllPostsFromDB.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPostsFromDB.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllPostsFromDB.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
    }
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
