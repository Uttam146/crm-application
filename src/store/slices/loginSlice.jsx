import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveLogin(state,action) {
            console.log(action.payload);
            state = action.payload;
            console.log(state);
        }
    }

})

export const { saveLogin } = loginSlice.actions;
export default loginSlice.reducer;