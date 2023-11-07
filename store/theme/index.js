import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const themeSlice = createSlice({
	name: "theme",
	initialState: { isDark: false },
	reducers,
});

export const themeActions = themeSlice.actions;
