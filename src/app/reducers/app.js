import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/${process.env.REACT_APP_API_VERSON}`;

const initialState = {};

// 
export const getEvents = createAsyncThunk(
    "app/getEvents",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/events/`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addEvent = createAsyncThunk(
    "app/addEvent",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/events/create`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateEvent = createAsyncThunk(
    "app/updateEvent",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/events/update/${data.id}`, data.formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    "app/deleteEvent",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/events/delete/${id}`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 
export const getTeam = createAsyncThunk(
    "app/getTeam",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/team/`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addMember = createAsyncThunk(
    "app/addMembeer",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/team/create`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateMember = createAsyncThunk(
    "app/updateMember",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/team/update/${data.id}`, data.formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteMember = createAsyncThunk(
    "app/deleteMember",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/team/delete/${id}`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//
export const updateUserEmail = createAsyncThunk(
    "app/updateUserEmail",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/admin/update/${data.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    "app/updateUserPassword",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/admin/update-password/${data.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},

});

// export const {  } = appSlice.actions;

export default appSlice.reducer;
