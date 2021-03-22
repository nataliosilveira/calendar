import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    reminders: [],
  },
  reducers: {
    updateReminder(state, aciton) {
      console.log('valor do action');
      console.log(aciton);
      state.reminders = aciton.payload;
    },
    createReminder(state, action) {
      state.reminders = action.payload;
    },
  },
});

export default calendarSlice.reducer;

export const { updateReminder, createReminder } = calendarSlice.actions;
