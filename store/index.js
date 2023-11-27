import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user";
import { addUserSlice } from "./addUser";

import { langSlice } from "./lang";
import { groupsSlice } from "./groups";
import { themeSlice } from "./theme";
import { addPlanSlice } from "./addPlan";
import { quranSlice } from "./quran";
import { plansSlice } from "./plans";
import { globalDateSlice } from "./globalDate";

export const Store = configureStore({
	reducer: {
		user: userSlice.reducer,
		addUser: addUserSlice.reducer,

		lang: langSlice.reducer,
		groups: groupsSlice.reducer,
		theme: themeSlice.reducer,
		quran: quranSlice.reducer,
		// plans
		addPlan: addPlanSlice.reducer,
		plans: plansSlice.reducer,
		globalDate: globalDateSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
