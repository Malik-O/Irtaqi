import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const plansSlice = createSlice({
	name: "plans",
	initialState: { plans: [], instancesHistory: [], plansDataKey: "PLANS" },
	reducers,
});

export const plansActions = plansSlice.actions;
