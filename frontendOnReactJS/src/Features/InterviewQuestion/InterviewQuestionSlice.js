/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    questions: [],
    responseStatus: "",
    responseMessage: "",
};

export const createQuestion = createAsyncThunk(
    "questions/createQuestion",
    async (question, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/interview-question`, JSON.stringify(question), {
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

export const getQuestions = createAsyncThunk(
    "questions/getQuestions",
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/interview-question/${courseId}`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getQuestion = createAsyncThunk(
    "questions/getQuestion",
    async (questionId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/single-interview-question/${questionId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateQuestion = createAsyncThunk(
    "questions/updateQuestion",
    async (question, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/interview-question/${question.get('id')}`,
                question,
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

export const deleteQuestion = createAsyncThunk(
    "questions/deleteQuestion",
    async (questionId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/interview-question/${questionId}`,
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


const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        resetQuestionState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createQuestion.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createQuestion.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Question created successfully";
        })
        .addCase(createQuestion.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getQuestions.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getQuestions.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getQuestion.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getQuestion.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getQuestion.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateQuestion.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateQuestion.fulfilled, (state, action) => {
            if (Array.isArray(state.questions)) {
            state.questions = state.questions.map((question) =>
                question.id === action.payload._id ? action.payload : question
            );
            } else {
            state.questions = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Question updated successfully";
        })
        .addCase(updateQuestion.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deleteQuestion.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteQuestion.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Question deleted successfully";
        })
        .addCase(deleteQuestion.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetQuestionState } = questionsSlice.actions;
export default questionsSlice.reducer;