import { configureStore } from "@reduxjs/toolkit";
import TicketSlice from "./TicketSlice";
import FormSlice from "./FormSlice";

export const store = configureStore({
  reducer: {
    ticket: TicketSlice,
    data: FormSlice,
  },
});
