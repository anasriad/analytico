"use client";
import { configureStore } from "@reduxjs/toolkit"
import stepperReducer from './StepperSlice';
export const store = configureStore({
  reducer: {
    stepper: stepperReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['stepper/fillForm'],
        ignoredPaths: ['stepper.upload'],
      },
    }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch