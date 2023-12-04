import { notificationsActions } from "../../../store/notifications";
import { useSelector } from "react-redux";
import useConnectToStore from "../index";

export default function () {
	const { notificationsDataKey } = useSelector(
		(state) => state.notifications,
	);

	return new useConnectToStore({
		reduxActions: notificationsActions,
		secureStorageKey: notificationsDataKey,
		updateActionName: "seenAll",
		initActionName: "add",
		// deleteActionName: "deleteAllGroupsState",
		isJSON: true,
	});
}
