import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userData: null,
		loginFormData: { email: "teacher@gmail.com", password: "123" },
		userDataKey: "USER",
	},
	reducers,
});

export const userActions = userSlice.actions;
