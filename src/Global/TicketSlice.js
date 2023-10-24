import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketDetail: []
};

export const TicketSlice = createSlice({
  name: "ticketDetail",
  initialState,
  reducers: {
    detail: (state, action) => {
      state.ticketDetail = action.payload;
    },
  },
});

export const { detail } = TicketSlice.actions;

export default TicketSlice.reducer;
