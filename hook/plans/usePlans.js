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
// import connectToPlansStore from "./useConnectToStore/instants/connectToPlansStore";

// export default async function () {
// 	const [isLoading, setIsLoading] = useState(false);

// 	return { isLoading };
// }
export default async function () {
	loadDevMessages();
	loadErrorMessages();
	// connect with plan store
	const PlanStoreConnectionsInstance = connectToPlansStore();
	// redux
	// const { groups } = useSelector((state) => state.groups);
	//
	const { courseID, studentID } = useLocalSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	//
	const GetPlans = graphQl.queries.GetPlans;
	const [
		getPlans,
		{ graphQlLoading, error: graphQlError, data: graphQlData },
	] = useLazyQuery(GetPlans);

	useEffect(() => {
		setIsLoading(true);
		getPlans({ variables: { entityID: studentID } })
			.then(({ data }) => {
				PlanStoreConnectionsInstance.init(data.plans);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(
					"there is a problem loading the groups, please try again later.",
				);
			});
	}, []);
	// get the stored Plans
	// const planConnectionsInstance = connectToPlansStore();
	useEffect(() => {
		PlanStoreConnectionsInstance.get();
	}, []);

	return { isLoading, error };
}
