import { plansActions } from "../../../store/plans";
import { useSelector } from "react-redux";
import useConnectToStore from "../index";

export default function () {
	const { plansDataKey } = useSelector((state) => state.plans);

	return new useConnectToStore({
		reduxActions: plansActions,
		secureStorageKey: plansDataKey,
		initActionName: "initPlans",
		updateActionName: "addPlans",
		deleteActionName: "deleteAllPlansState",
		isJSON: true,
	});
}
