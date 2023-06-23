// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import * as Localization from 'expo-localization';

let initialLanguage = Localization.locale.split('-')[0];

const languageSlice = createSlice({
  name: 'language',
  initialState: initialLanguage,
  reducers: {
    switchLanguage(state, action) {
      return action.payload;
    },
  },
});

export const { switchLanguage } = languageSlice.actions;

export default languageSlice.reducer;
