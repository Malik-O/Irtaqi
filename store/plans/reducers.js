// utils
import sameHistoryCondition from "../../utils/sameHistoryCondition";
import filterSameDateHistory from "./filterSameDateHistory";

export default {
	initPlans(state, action) {
		state.plans = action.payload;
	},
	addPlans(state, action) {
		state.plans = [...state.plans, ...action.payload];
	},
	deleteAllPlansState(state) {
		state.plans = null;
	},
	addInstancesHistory(state, action) {
		console.log("addInstancesHistory:");
		let newInstancesHistory;
		//* in the first we dump all the instances history from DB
		if (action.payload instanceof Array) {
			newInstancesHistory = [
				...state.instancesHistory,
				...action.payload,
			];
			// filter out the old history if any
			newInstancesHistory = filterSameDateHistory(newInstancesHistory);
		}
		//* after that we edit some of it one by one
		else {
			let updated = false;
			newInstancesHistory = state.instancesHistory.map((instance) => {
				if (sameHistoryCondition(instance, action.payload)) {
					updated = true;
					return { ...instance, ...action.payload };
				} else return instance;
			});
			// if
			if (!updated)
				newInstancesHistory = newInstancesHistory.concat(
					action.payload,
				);
		}
		// update state
		state.instancesHistory = newInstancesHistory;
	},
};
