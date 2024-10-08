import {
    Action,
    PayloadAction,
    createSlice
} from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { fetchUsers } from "./userThunk";

const initialState: IUserState = {
    users: null,
    status: 'idle',
    error: null,
};

function isError(action: Action) {
    return action.type.endsWith('rejected');
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'succeeded';
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const userReducer = userSlice.reducer;