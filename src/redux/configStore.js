import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducer/userReducer"

export const store = configureStore({
  reducer: {
    userReducer: userReducer
  }
})

