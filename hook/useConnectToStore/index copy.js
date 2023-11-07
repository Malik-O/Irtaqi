import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

export default class ConnectToStore {
	// dispatchReduxState = dispatch(userActions.setUserDataState(data));
	constructor({
		reduxActions,
		secureStorageKey,
		initActionName,
		updateActionName,
		deleteActionName,
		isJSON = false,
	}) {
		this.dispatch = useDispatch();
		this.reduxActions = reduxActions;
		this.secureStorageKey = secureStorageKey;
		// actions
		this.initActionName = initActionName;
		this.updateActionName = updateActionName;
		this.deleteActionName = deleteActionName;
		this.isJSON = isJSON;
	}
	get() {
		SecureStore.getItemAsync(this.secureStorageKey).then((data) => {
			data = this.isJSON ? JSON.parse(data) : data;
			// update redux state with the stored data
			this.dispatch(this.reduxActions[this.initActionName](data));
		});
	}
	init(feedData) {
		this.fireAction(this.initActionName, feedData);
	}
	add(feedData) {
		this.fireAction(this.updateActionName, feedData);
	}
	delete() {
		SecureStore.deleteItemAsync(this.secureStorageKey).then(() =>
			this.dispatch(this.reduxActions[this.deleteActionName]()),
		);
	}
	fireAction(action, feedData) {
		// update redux state
		this.dispatch(this.reduxActions[action](feedData));
		// update secure store state
		feedData = this.isJSON ? JSON.stringify(feedData) : feedData;
		return SecureStore.setItemAsync(this.secureStorageKey, feedData);
	}
}
