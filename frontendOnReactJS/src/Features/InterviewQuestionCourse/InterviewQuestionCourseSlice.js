/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    questionCourses: [],
    responseStatus: "",
    responseMessage: "",
};

export const createQuestionCourse = createAsyncThunk(
    "questionCourses/createQuestionCourse",
    async (questionCourse, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/interview-question-course`, JSON.stringify(questionCourse), {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getQuestionCourses = createAsyncThunk(
    "questionCourses/getQuestionCourses",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/interview-question-course`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getQuestionCourse = createAsyncThunk(
    "questionCourses/getQuestionCourse",
    async (questionCourseId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/interview-question-course/${questionCourseId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateQuestionCourse = createAsyncThunk(
    "questionCourses/updateQuestionCourse",
    async (questionCourse, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/interview-question-course/${questionCourse.get('id')}`,
                questionCourse,
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

export const deleteQuestionCourse = createAsyncThunk(
    "questionCourses/deleteQuestionCourse",
    async (questionCourseId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/interview-question-course/${questionCourseId}`,
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


const questionCoursesSlice = createSlice({
    name: "questionCourses",
    initialState,
    reducers: {
        resetQuestionCourseState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createQuestionCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createQuestionCourse.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Question Course created successfully";
        })
        .addCase(createQuestionCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getQuestionCourses.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getQuestionCourses.fulfilled, (state, action) => {
            state.questionCourses = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getQuestionCourses.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getQuestionCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getQuestionCourse.fulfilled, (state, action) => {
            state.questionCourses = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getQuestionCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateQuestionCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateQuestionCourse.fulfilled, (state, action) => {
            if (Array.isArray(state.questionCourses)) {
            state.questionCourses = state.questionCourses.map((questionCourse) =>
                questionCourse.id === action.payload._id ? action.payload : questionCourse
            );
            } else {
            state.questionCourses = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Question Course updated successfully";
        })
        .addCase(updateQuestionCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deleteQuestionCourse.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteQuestionCourse.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Question Course status changed successfully";
        })
        .addCase(deleteQuestionCourse.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetQuestionCourseState } = questionCoursesSlice.actions;
export default questionCoursesSlice.reducer;