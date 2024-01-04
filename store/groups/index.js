import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const groupsSlice = createSlice({
	name: "groups",
	initialState: {
		groups: [],
		attendanceHistory: [],
		groupsDataKey: "GROUPS",
		addGroupFormData: {},
	},
	reducers,
});

export const groupsActions = groupsSlice.actions;
