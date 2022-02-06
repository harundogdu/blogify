import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "services/authService";

export const authLoginUser = createAsyncThunk("auth/loginUser", async (payload, { dispatch }) => {
    const response = await authService.post(`/auth/login`, payload);
    return response;
})

export const authLogoutUser = createAsyncThunk("auth/logoutUser", async () => {
    const response = await authService.get(`/auth/logout`);
    return response;
})


const initialState = {
    isAuthenticated: false,
    token: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.isLoading = false;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.isLoading = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        /* authLoginUser */
        builder.addCase(authLoginUser.pending, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.error = null;
        });
        builder.addCase(authLoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const token = action.payload.data.accessToken;
            if (token) {
                state.isAuthenticated = true;
                localStorage.setItem("token", token);
            }
        });
        builder.addCase(authLoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.error = action.error.message;
        });
        /* authLogoutUser */
        builder.addCase(authLogoutUser.pending, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.error = null;
        });
        builder.addCase(authLogoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
        });
        builder.addCase(authLogoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
            state.error = action.error.message;
        });
    }
});

export const { loginUserSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;