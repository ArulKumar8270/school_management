import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listData: [],
    loading: false,
    error: null,
    response: null,
};

const getAPISlice = createSlice({
    name: 'getAPI',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.listData = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError
} = getAPISlice.actions;

export const getAPIReducer = getAPISlice.reducer;