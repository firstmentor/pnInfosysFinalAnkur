/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    courses: [],
    responseStatus: "",
    responseMessage: "",
};

export const createCourse = createAsyncThunk(
    "courses/createCourse",
    async (course, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/course`, course, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "multipart-formdata"
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/course`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getCourse = createAsyncThunk(
    "courses/getCourse",
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/course/${courseId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateCourse = createAsyncThunk(
    "courses/updateCourse",
    async (course, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/course/${course.get('id')}`,
                course,
                {
                    headers: {
                        "x-authorization": `Bearer ${user_id}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "courses/deleteCourse",
    async (courseId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/course/${courseId}`,
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


const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        resetCourseState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createCourse.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Course created successfully";
        })
        .addCase(createCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getCourses.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCourses.fulfilled, (state, action) => {
            state.courses = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getCourses.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCourse.fulfilled, (state, action) => {
            state.courses = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
            if (Array.isArray(state.courses)) {
            state.courses = state.courses.map((course) =>
                course.id === action.payload._id ? action.payload : course
            );
            } else {
            state.courses = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Course updated successfully";
        })
        .addCase(updateCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deleteCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteCourse.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Course status changed successfully";
        })
        .addCase(deleteCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetCourseState } = coursesSlice.actions;
export default coursesSlice.reducer;