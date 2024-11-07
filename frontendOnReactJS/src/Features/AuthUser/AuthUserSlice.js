/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    authUsers: [],
    responseStatus: "",
    responseMessage: "",
};

export const getAuthUser = createAsyncThunk(
    "authUsers/getAuthUser",
    async (userId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.get(
                `${baseURL}/get-user`,
                {
                    headers: {
                        "x-authorization": `Bearer ${user_id}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateAuthUser = createAsyncThunk(
    "authUsers/updateAuthUser",
    async (authUser, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/update-user`,
                JSON.stringify(authUser),
                {
                    headers: {
                        "x-authorization": `Bearer ${user_id}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateAuthUserPassword = createAsyncThunk(
    "authUsers/updateAuthUserPassword",
    async (authUser, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/update-user-password`,
                JSON.stringify(authUser),
                {
                    headers: {
                        "x-authorization": `Bearer ${user_id}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const authUsersSlice = createSlice({
    name: "authUsers",
    initialState,
    reducers: {
        resetAuthUserState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // get reducer
        builder
        .addCase(getAuthUser.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getAuthUser.fulfilled, (state, action) => {
            state.authUsers = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getAuthUser.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateAuthUser.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateAuthUser.fulfilled, (state, action) => {
            if (Array.isArray(state.authUsers)) {
            state.authUsers = state.authUsers.map((authUser) =>
                authUser.id === action.payload._id ? action.payload : authUser
            );
            } else {
            state.authUsers = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Details updated successfully";
        })
        .addCase(updateAuthUser.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateAuthUserPassword.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateAuthUserPassword.fulfilled, (state, action) => {
            if (Array.isArray(state.authUsers)) {
            state.authUsers = state.authUsers.map((authUser) =>
                authUser.id === action.payload._id ? action.payload : authUser
            );
            } else {
            state.authUsers = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Password changed successfully";
        })
        .addCase(updateAuthUserPassword.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetAuthUserState } = authUsersSlice.actions;
export default authUsersSlice.reducer;