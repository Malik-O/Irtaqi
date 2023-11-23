import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const addUserSlice = createSlice({
	name: "addUser",
	initialState: {
		loading: false,
		formData: {},
		// dateOfBirth: new Date(),
		// typeDialog: false,
	},
	reducers,
});

export const addUserActions = addUserSlice.actions;
