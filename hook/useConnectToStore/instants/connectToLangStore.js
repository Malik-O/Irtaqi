import { langActions } from "../../../store/lang";
import { useSelector } from "react-redux";
import useConnectToStore from "../index";

export default function () {
	const { langDataKey } = useSelector((state) => state.lang);

	return new useConnectToStore({
		reduxActions: langActions,
		secureStorageKey: langDataKey,
		initActionName: "changeLang",
		deleteActionName: "deleteLang",
		isJSON: false,
	});
}
