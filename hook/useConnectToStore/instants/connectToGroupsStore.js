import { groupsActions } from "../../../store/groups";
import { useSelector } from "react-redux";
import useConnectToStore from "../index";

export default function () {
	const { groupsDataKey } = useSelector((state) => state.groups);

	return new useConnectToStore({
		reduxActions: groupsActions,
		secureStorageKey: groupsDataKey,
		initActionName: "initGroupsState",
		deleteActionName: "deleteAllGroupsState",
		isJSON: true,
	});
}
