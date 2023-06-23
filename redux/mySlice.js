import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservation: false,
  addChateau: false,
  userID: null,
  messageShared: "",
  name: "",
};

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.reservation = action.payload;
    },
    setAddChateau: (state, action) => {
      state.addChateau = action.payload;
    },
    setUserId: (state, action) => {
      state.userID = action.payload;
    },
    setMessageShared: (state, action) => {
      state.messageShared = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setReservation,
  setName,
  setAddChateau,
  setUserId,
  setHandelDeleteChateau,
} = mySlice.actions;

export default mySlice.reducer;
