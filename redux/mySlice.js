import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileUrl:
    "https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/unknow.jpg",
};

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    setProfileUrl: (state, action) => {
      state.profileUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileUrl } = mySlice.actions;

export default mySlice.reducer;
