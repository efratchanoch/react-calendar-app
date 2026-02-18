import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monthData: {
    "2026-01-01": { date: "2026-01-01", hebrew: "יב בטבת תשפו", events: [] },
    "2026-01-02": { date: "2026-01-02", hebrew: "יג בטבת תשפו", events: ["מבחן בריאקט"] }
  },
  loading: false,
  error: null
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const { date, eventName } = action.payload;
      if (state.monthData[date]) {
        state.monthData[date].events.push(eventName);
      }
    },

    removeEvent: (state, action) => {
      const { date, index } = action.payload;
      if (state.monthData[date]) {
        state.monthData[date].events = state.monthData[date].events.filter((_, i) => i !== index);
      }
    }
  }
});




export const { addEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;