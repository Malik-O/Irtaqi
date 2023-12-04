import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: [],
		snackbar: { visible: false, data: {} },
		notificationsDataKey: "NOTIFICATIONS",
	},
	reducers,
});

export const notificationsActions = notificationsSlice.actions;
