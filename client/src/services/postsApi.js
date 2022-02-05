import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const postsApiHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const createRequest = (url) => ({ url, headers: postsApiHeaders });

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => createRequest(`/posts`),
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: `/posts/create`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useCreatePostMutation,
    useAddPostMutation,
} = postApi;