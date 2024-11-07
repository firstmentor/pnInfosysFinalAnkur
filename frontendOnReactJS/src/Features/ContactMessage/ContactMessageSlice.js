/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    messages: [],
    responseStatus: "",
    responseMessage: "",
};

export const createMessage = createAsyncThunk(
    "messages/createMessage",
    async (message, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/contact-message`, JSON.stringify(message), {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getMessages = createAsyncThunk(
    "messages/getMessages",
    async () => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.get(`${baseURL}/contact-message`, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`
                },
            });
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);


const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        resetMessageState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createMessage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createMessage.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Your Message sent successfully, We'll contact you soon..!";
        })
        .addCase(createMessage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getMessages.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetMessageState } = messagesSlice.actions;
export default messagesSlice.reducer;