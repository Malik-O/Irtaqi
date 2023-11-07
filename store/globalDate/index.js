import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const globalDateSlice = createSlice({
	name: "globalDate",
	initialState: { globalDate: new Date() },
	reducers,
});

export const globalDateActions = globalDateSlice.actions;
