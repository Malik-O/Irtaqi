import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

// states
import pages from "./states/pages";
import surahAdj from "./states/surahAdj";
import versesPerPage from "./states/versesPerPage";

export const quranSlice = createSlice({
	name: "quran",
	initialState: {
		//
		pages,
		surahAdj,
		versesPerPage,
		surahNames: surahAdj.chapters
			.map((s) => s.name_arabic)
			.reduce((acc, text, index) => {
				// return [...acc, text];
				return [...acc, { text, value: index }];
			}, []),
	},
	reducers,
});

export const quranActions = quranSlice.actions;
