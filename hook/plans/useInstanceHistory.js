import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { plansActions } from "../../store/plans";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";
// utils
import sameHistoryCondition from "../../utils/sameHistoryCondition";
// hooks
import usePush from "../notifications/usePush";

export default function (planInstance) {
	const pushNotification = usePush();
	// redux states
	const { instancesHistory } = useSelector((state) => state.plans);
	const { globalDate } = useSelector((state) => state.globalDate);
	// graphQL
	const dispatch = useDispatch();
	const GetPlanInstanceHistoryAtDate =
		graphQl.queries.GetPlanInstanceHistoryAtDate;
	const [getHistory, { loading, error: graphQlError, data: graphQlData }] =
		useLazyQuery(GetPlanInstanceHistoryAtDate);
	// prepare vars
	const variables = {
		planInstanceId: planInstance.id,
		date: planInstance.date,
	};
	useEffect(() => {
		// check if there existing history do not make request
		const isThereAny = instancesHistory.some((instance) => {
			return sameHistoryCondition(instance, planInstance);
		});
		if (isThereAny) return;
		// isLoading = true;
		getHistory({ variables })
			.then(({ data: { PlanInstanceHistoryAtDate } }) => {
				dispatch(
					plansActions.addInstancesHistory(PlanInstanceHistoryAtDate),
				);
				// isLoading = false;
				// console.log("isLoading:", isLoading);
			})
			.catch((err) =>
				pushNotification({
					type: "error",
					message: "QueryError",
					error: JSON.stringify(err),
				}),
			);
	}, [globalDate]);
	return loading;
}
