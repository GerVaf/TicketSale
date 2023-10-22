import { configureStore } from "@reduxjs/toolkit";
import TicketSlice from "./TicketSlice";

export const store = configureStore({
  reducer: {
    ticket: TicketSlice,
  },
});
