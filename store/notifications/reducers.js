import * as SecureStore from "expo-secure-store";

export default {
	add(state, action) {
		let actionPayload = [...action.payload];
		// loop throw local store if exists then update else add
		state.notifications.forEach((notification, notStoreI) => {
			actionPayload = actionPayload.filter((payload, pi) => {
				if (payload.id !== notification.id) return true;
				state.notifications.splice(notStoreI, 1, {
					...state.notifications[notStoreI],
					...actionPayload[pi],
				});
			});
		});
		// add the remaining
		state.notifications = [...state.notifications, ...actionPayload];
	},
	seenAll(state, action) {
		state.notifications = state.notifications.map((notification) => ({
			...notification,
			seen: true,
		}));
	},
	// snackbar
	setSnackbarVisible(state, action) {
		state.snackbar.visible = action.payload;
	},
	setSnackbarData(state, action) {
		state.snackbar.data = action.payload;
	},
};
