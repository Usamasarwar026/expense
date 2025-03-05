import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice/authSlice'
import transctionReducer from './transctionSlice/transctionSlice'
import imageReducer from "./imageSlice/imageSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transctions: transctionReducer,
    image: imageReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch