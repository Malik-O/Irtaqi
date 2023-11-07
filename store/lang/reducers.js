export default {
	changeLang: (state, action) => {
		state.locale = action.payload;
	},
	deleteLang: (state) => {
		state.locale = null;
	},
};
