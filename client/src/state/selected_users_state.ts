import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const selectedUsersSlice = createSlice({
    name: "selectedUsers",
    initialState: initialState,
    reducers: {
        addSelectedUser: (state, action) => {
            const itemToAdd = action.payload;
            // Use the spread operator to create a new array by merging the payload with the current state
            return [...state, itemToAdd];
        },
        removeSelectedUser: (state, action) => {
            const itemToRemove = action.payload;
            // Use the filter method to create a new array with the item removed
            return state.filter((item) => item !== itemToRemove);
        },
        clearSelectedUsers: (state) => {
            return [];
        },
    },
});

export const { addSelectedUser, removeSelectedUser, clearSelectedUsers } =
    selectedUsersSlice.actions;

export default selectedUsersSlice.reducer;
