/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    certificates: [],
    responseStatus: "",
    responseMessage: "",
};

export const createCertificate = createAsyncThunk(
    "certificates/createCertificate",
    async (certificate, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/certificate`, certificate, {
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

export const getCertificates = createAsyncThunk(
    "certificates/getCertificates",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/certificate`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getCertificate = createAsyncThunk(
    "certificates/getCertificate",
    async (certificateId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.get(
                `${baseURL}/certificate/${certificateId}`, {
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

export const updateCertificate = createAsyncThunk(
    "certificates/updateCertificate",
    async (certificate, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;
            
            const response = await axios.put(
                `${baseURL}/certificate/${certificate.get('id')}`,
                certificate,
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

export const deleteCertificate = createAsyncThunk(
    "certificates/deleteCertificate",
    async (certificateId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("pnInfosysAuthToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/certificate/${certificateId}`,
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


const certificatesSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {
        resetCertificateState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createCertificate.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createCertificate.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Certificate created successfully";
        })
        .addCase(createCertificate.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.payload;
        });

        // get all reducers
        builder
        .addCase(getCertificates.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCertificates.fulfilled, (state, action) => {
            state.certificates = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getCertificates.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getCertificate.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCertificate.fulfilled, (state, action) => {
            state.certificates = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getCertificate.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateCertificate.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateCertificate.fulfilled, (state, action) => {
            if (Array.isArray(state.certificates)) {
            state.certificates = state.certificates.map((certificate) =>
                certificate.id === action.payload._id ? action.payload : certificate
            );
            } else {
            state.certificates = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Certificate updated successfully";
        })
        .addCase(updateCertificate.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deleteCertificate.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteCertificate.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Certificate deleted successfully";
        })
        .addCase(deleteCertificate.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetCertificateState } = certificatesSlice.actions;
export default certificatesSlice.reducer;