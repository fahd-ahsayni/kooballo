import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase_customer } from "../supabase/supabase-customer";

export const fetchChateau = createAsyncThunk(
  'chateau/fetchChateau',
  async (userID) => {
    const { data, error } = await supabase_customer
      .from("chateau")
      .select("*")
      .eq("customer_id", userID);
    if (error) {
      throw error;
    }
    return data;
  }
);

export const chateauSlice = createSlice({
  name: 'chateau',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChateau.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchChateau.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.entities = action.payload;
    });
  }
});

export default chateauSlice.reducer;
