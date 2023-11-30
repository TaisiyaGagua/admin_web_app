import { createSlice } from "@reduxjs/toolkit";
import { User } from "../dtos/user";

const initialState: User[] = [];

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        getUsersRequest: () => {},
        getUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        getUsersFailure: (state, action) => {},
        blockUsersRequest: (state, action) => {},
        blockUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        blockUsersFailure: (state, action) => {},
        unblockUsersRequest: (state, action) => {},
        unblockUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        unblockUsersFailure: (state, action) => {},
        deleteUsersRequest: (state, action) => {},
        deleteUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        deleteUsersFailure: (state, action) => {},

        updateLastLoginUserRequest: (state, action) => {},
        updateLastLoginUserSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        updateLastLoginUserFailure: (state, action) => {},
    },
});

export const {
    updateLastLoginUserRequest,
    updateLastLoginUserSuccess,
    updateLastLoginUserFailure,
    deleteUsersRequest,
    deleteUsersSuccess,
    deleteUsersFailure,
    unblockUsersRequest,
    unblockUsersSuccess,
    unblockUsersFailure,
    blockUsersRequest,
    blockUsersSuccess,
    blockUsersFailure,
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
