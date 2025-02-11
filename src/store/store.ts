import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice/authSlice'
import transctionReducer from './transctionSlice/transctionSlice' 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transctions: transctionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch