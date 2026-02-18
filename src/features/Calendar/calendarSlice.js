import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMonthData = createAsyncThunk(
  'calendar/fetchMonthData',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const formattedStartDate = startDate.toLocaleDateString('en-CA');
      const formattedEndDate = endDate.toLocaleDateString('en-CA');

      const response = await axios.get(
        `https://www.hebcal.com/converter?cfg=json&start=${formattedStartDate}&end=${formattedEndDate}&g2h=1`
      );

      return response.data.hdates; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    monthData: {},
    loading: false,
    error: null
  },
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
          state.monthData[date].events.splice(index, 1);
        }
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthData.fulfilled, (state, action) => {
        state.loading = false;

        const processedData = {};
        Object.entries(action.payload).forEach(([date, info]) => {
          processedData[date] = {
            hebrew: info.hebrew,
            events: [] 
          };
        });

        state.monthData = processedData;
      })
      .addCase(fetchMonthData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        alert(`שגיאה בטעינת הנתונים: ${action.payload}`); 
      });
  }
});

export const { addEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;