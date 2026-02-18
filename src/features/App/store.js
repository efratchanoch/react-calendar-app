import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../Calendar/calendarSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});