import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "services/postService";

export const getAllPostsFromDB = createAsyncThunk("posts/getAllPostsFromDB", async () => {
    const posts = await postService.get(`/posts`);
    return posts;
});

export const addPostToDB = createAsyncThunk("posts/addPostToDB", async (post) => {
    const response = await postService.post(`/posts/create`, post);
    return response;
});

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
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
        /* addPostToDB */
        builder.addCase(addPostToDB.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addPostToDB.fulfilled, (state, action) => {
            state.posts.unshift(action.payload);
            state.isLoading = false;
        });
        builder.addCase(addPostToDB.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
    }
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
