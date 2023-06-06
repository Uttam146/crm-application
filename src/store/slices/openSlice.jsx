import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false
};
const openSlice = createSlice({
    name: 'open',
    initialState,
    reducers: {
        saveOpen(state,action) {
            state.open = !state.open;
        }   
    }

})

export const { saveOpen } = openSlice.actions;
export default openSlice.reducer;