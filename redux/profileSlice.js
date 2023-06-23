import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase_customer } from '../supabase/supabase-customer';


// Define the async thunk
export const fetchProfile = createAsyncThunk(
  'profiles/fetchProfile',
  async (userId, thunkAPI) => {
    const { data, error } = await supabase_customer.from('profiles').select('*').eq('id', userId);

    if (error) {
      return thunkAPI.rejectWithValue(error);
    }

    return data[0];
  }
);

// Define the slice
const profilesSlice = createSlice({
  name: 'profiles',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default profilesSlice.reducer;
