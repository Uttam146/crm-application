import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        saveCalendarEvents(state,action) {
            let obj = {
                title:action.payload.title,
                start:new Date(action.payload.start),
                end:new Date(action.payload.end)
            }
            state.push(obj);
        }
    }

})

export const { saveCalendarEvents } = calendarSlice.actions;
export default calendarSlice.reducer;