import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase_customer } from '../supabase/supabase-customer';


export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, thunkAPI) => {
    try {
      const { data, error } = await supabase_customer
        .from("orders")
        .select("*")
        .eq("costumer_id", userId);

      if (error) throw error;

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
