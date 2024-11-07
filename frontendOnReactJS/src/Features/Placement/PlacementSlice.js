/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    placements: [],
    responseStatus: "",
    responseMessage: "",
};

export const createPlacement = createAsyncThunk(
    "placements/createPlacement",
    async (placement, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/placement`, placement, {
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

export const getPlacements = createAsyncThunk(
    "placements/getPlacements",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/placement`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getPlacement = createAsyncThunk(
    "placements/getPlacement",
    async (placementId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.get(
                `${baseURL}/placement/${placementId}`, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`
                },
            }
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updatePlacement = createAsyncThunk(
    "placements/updatePlacement",
    async (placement, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/placement/${placement.get('id')}`,
                placement,
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

export const deletePlacement = createAsyncThunk(
    "placements/deletePlacement",
    async (placementId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/placement/${placementId}`,
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


const placementsSlice = createSlice({
    name: "placements",
    initialState,
    reducers: {
        resetPlacementState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createPlacement.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createPlacement.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Placement created successfully";
        })
        .addCase(createPlacement.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getPlacements.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getPlacements.fulfilled, (state, action) => {
            state.placements = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getPlacements.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getPlacement.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getPlacement.fulfilled, (state, action) => {
            state.placements = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getPlacement.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updatePlacement.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updatePlacement.fulfilled, (state, action) => {
            if (Array.isArray(state.placements)) {
            state.placements = state.placements.map((placement) =>
                placement.id === action.payload._id ? action.payload : placement
            );
            } else {
            state.placements = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Placement updated successfully";
        })
        .addCase(updatePlacement.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deletePlacement.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deletePlacement.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Placement deleted successfully";
        })
        .addCase(deletePlacement.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetPlacementState } = placementsSlice.actions;
export default placementsSlice.reducer;