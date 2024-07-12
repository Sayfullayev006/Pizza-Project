import { configureStore } from "@reduxjs/toolkit";
import { OrderProducts } from "./reducer";
export const store = configureStore({
  reducer: OrderProducts.reducer,
});
