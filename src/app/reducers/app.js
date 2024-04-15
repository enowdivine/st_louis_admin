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
export const getResearch = createAsyncThunk(
    "app/getResearch",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/research/`);
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

export const addResearch = createAsyncThunk(
    "app/addResearch",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/research/create`, data, {
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

export const updateResearch = createAsyncThunk(
    "app/updateResearch",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/research/update/${data.id}`, data.formData, {
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

export const deleteResearch = createAsyncThunk(
    "app/deleteResearch",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/research/delete/${id}`);
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
export const getProgrammes = createAsyncThunk(
    "app/getProgrammes",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/programmes/`);
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

export const addProgramme = createAsyncThunk(
    "app/addProgramme",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/programmes/create`, data, {
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

export const updateProgramme = createAsyncThunk(
    "app/updateProgramme",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/programmes/update/${data.id}`, data.formData, {
                headers: {
                    "Content-Type": "application/json",
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

export const deleteProgramme = createAsyncThunk(
    "app/deleteProgramme",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/programmes/delete/${id}`);
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
export const getCampuses = createAsyncThunk(
    "app/getCampuses",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/campuses/`);
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

export const addCampuses = createAsyncThunk(
    "app/addCampuses",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/campuses/create`, data, {
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

export const updateCampus = createAsyncThunk(
    "app/updateCampus",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/campuses/update/${data.id}`, data.formData, {
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

export const deleteCampus = createAsyncThunk(
    "app/deleteCampus",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/campuses/delete/${id}`);
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
export const getFaculties = createAsyncThunk(
    "app/getFaculties",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/faculties/`);
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

export const addFaculty = createAsyncThunk(
    "app/addFaculty",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/faculties/create`, data, {
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

export const updateFaculty = createAsyncThunk(
    "app/updateFaculty",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/faculties/update/${data.id}`, data.formData, {
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

export const deleteFaculty = createAsyncThunk(
    "app/deleteFaculty",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/faculties/delete/${id}`);
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
export const getCourses = createAsyncThunk(
    "app/getCourses",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/courses/`);
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

export const addCourses = createAsyncThunk(
    "app/addCourses",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/courses/create`, data, {
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

export const updateCourse = createAsyncThunk(
    "app/updateCourse",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/courses/update/${data.id}`, data, {
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

export const deleteCourse = createAsyncThunk(
    "app/deleteCourse",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/courses/delete/${id}`);
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
export const getCategories = createAsyncThunk(
    "app/getCategories",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/categories/`);
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

export const addCategories = createAsyncThunk(
    "app/addCategories",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/categories/create`, data, {
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

export const updateCategories = createAsyncThunk(
    "app/updateCategories",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/categories/update/${data.id}`, data, {
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

export const deleteCategory = createAsyncThunk(
    "app/deleteCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/categories/delete/${id}`);
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
