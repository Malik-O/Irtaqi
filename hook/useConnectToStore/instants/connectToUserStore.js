import { userActions } from "../../../store/user";
import { useSelector } from "react-redux";
import useConnectToStore from "../index";

export default function () {
	const { userDataKey } = useSelector((state) => state.user);

	return new useConnectToStore({
		reduxActions: userActions,
		secureStorageKey: userDataKey,
		initActionName: "setUserDataState",
		deleteActionName: "deleteUserDataState",
		isJSON: true,
	});
}
