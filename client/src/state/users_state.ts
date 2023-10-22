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
        getUsersFailure: (state, action) => {
            let a = 1;
        },
        blockUsersRequest: () => {},
        blockUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);

        },
        blockUsersFailure: (state, action) => {},
    },
});

export const {
    blockUsersRequest,
    blockUsersSuccess,
    blockUsersFailure,
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
