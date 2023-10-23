import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    age: 0,
    slot: '',
  };

export const studentInfoSlice = createSlice({
    name: 'studentInfo',
    initialState,
    reducers: {
      saveStudentInfo: (state, action) => {
        // Update properties directly
        state.name = action.payload.name;
        state.age = action.payload.age;
        state.slot = action.payload.slot;
      },
    },
  });
  

export const {saveStudentInfo} = studentInfoSlice.actions;

export default studentInfoSlice.reducer