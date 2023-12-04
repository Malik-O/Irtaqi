import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

const today = new Date();
export const globalDateSlice = createSlice({
	name: "globalDate",
	initialState: { globalDate: today, selectedMonth: today },
	reducers,
});

export const globalDateActions = globalDateSlice.actions;
