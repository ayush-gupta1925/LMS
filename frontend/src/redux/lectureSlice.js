import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectureData: []
  },
  reducers: {
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },
    addLecture: (state, action) => {
      state.lectureData.push(action.payload);
    },
    updateLecture: (state, action) => {
      state.lectureData = state.lectureData.map((l) =>
        l._id === action.payload._id ? action.payload : l
      );
    },
    removeLecture: (state, action) => {
      state.lectureData = state.lectureData.filter(
        (l) => l._id !== action.payload
      );
    }
  }
});

export const { setLectureData, addLecture, updateLecture, removeLecture } =
  lectureSlice.actions;
export default lectureSlice.reducer;
