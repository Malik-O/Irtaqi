import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
// graphQL
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector } from "react-redux";
// hook
import connectToPlansStore from "../useConnectToStore/instants/connectToPlansStore";
import usePush from "../notifications/usePush";

export default async function () {
	const pushNotification = usePush();
	// connect with plan store
	const PlanStoreConnectionsInstance = connectToPlansStore();
	// redux
	// const { groups } = useSelector((state) => state.groups);
	//
	const { studentID } = useLocalSearchParams();
	// const [isLoading, setIsLoading] = useState(false);
	//
	const GetPlans = graphQl.queries.GetPlans;
	const [getPlans, { loading, error: graphQlError, data: graphQlData }] =
		useLazyQuery(GetPlans);

	useEffect(() => {
		// setIsLoading(true);
		getPlans({ variables: { entityID: studentID } })
			.then(({ data }) => {
				PlanStoreConnectionsInstance.init(data.plans);
				// setIsLoading(false);
			})
			.catch((err) => {
				pushNotification({
					type: "error",
					message: "QueryError",
					error: JSON.stringify(err),
				});
			})
			.finally(() => {
				// get the stored Plans
				PlanStoreConnectionsInstance.get();
			});
	}, []);

	return { isLoading: loading };
}
