import { configureStore } from '@reduxjs/toolkit'
import mySlice from './mySlice'
import profileSlice from './profileSlice'
import chateauSlice from './chateauSlice'
import languageSlice from './languageSlice'
import ordersSlice from './ordersSlice'

export const store = configureStore({
  reducer: {
    mySlice,
    profiles: profileSlice,
    chateau: chateauSlice,
    language: languageSlice,
    orders: ordersSlice,
  },
})