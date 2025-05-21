import meetingSlice from "./meetingSlice";
import authSlice from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      meeting: meetingSlice.reducer,
    },
  });
  

// טיפוסים עבור Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
