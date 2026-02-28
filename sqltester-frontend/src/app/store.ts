import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import assignmentReducer from "../features/assignment/assignmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assignment: assignmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;