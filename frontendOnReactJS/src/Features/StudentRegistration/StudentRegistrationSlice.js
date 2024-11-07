/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    students: [],
    responseStatus: "",
    responseMessage: "",
};

export const createStudent = createAsyncThunk(
    "students/createStudent",
    async (student, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/student-registration`, JSON.stringify(student), {
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

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async () => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.get(`${baseURL}/students`, {
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

export const getDashboardData = createAsyncThunk(
    "students/getDashboardData",
    async () => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.get(`${baseURL}/dashboard-data`, {
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


const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        resetStudentState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createStudent.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createStudent.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Details submitted successfully, we will contact you soon, Thank you.";
        })
        .addCase(createStudent.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getStudents.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getStudents.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getDashboardData.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getDashboardData.fulfilled, (state, action) => {
            state.students = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getDashboardData.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetStudentState } = studentsSlice.actions;
export default studentsSlice.reducer;