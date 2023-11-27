import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const addPlanSlice = createSlice({
	name: "addPlan",
	initialState: {
		loading: false,
		formData: {},
		startingAt: new Date(),
		// type
		typeDialog: false,
		typeSelected: "",
		typeItems: ["new", "old", "tajweed", "tafseer", "custom"],
		// surah
		selectedSurah: null,
		surahDialog: false,
		//
		fromAyah: "1",
		amount: "1",
		weeks: "1",
		//
		selectedDays: [],
		daysDialog: false,

		colors: [
			"#ff5722",
			"#795548",
			"#607d8b",
			"#ff9800",
			"#f44336",
			"#cddc39",
			"#009688",
			"#673ab7",
			"#3f51b5",
		],
		// directions
		directions: ["descending", "progressive"],
		selectedDirections: "",
		directionsDialog: false,
	},
	reducers,
});

export const addPlanActions = addPlanSlice.actions;
