import React, { useState, useEffect } from "react";
// redux
import { useSelector } from "react-redux";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";
// hook
import connectToGroupsStore from "../useConnectToStore/instants/connectToGroupsStore";
import usePush from "../notifications/usePush";

export default function () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const pushNotification = usePush();
	// const [groups, setGroups] = useState([]);
	const StoreConnectionsInstance = connectToGroupsStore();
	// user state
	const { userData } = useSelector((state) => state.user);
	// graphQL
	const GetUserGroups = graphQl.queries.GetUserGroups;
	const [
		getGroups,
		{ graphQlLoading, error: graphQlError, data: graphQlData, refetch },
	] = useLazyQuery(GetUserGroups);
	// variables
	const variables = { user_id: userData?.id };
	// do the request as soon as the user id loads (do not worry it wont fetch again)
	useEffect(() => {
		console.log("variables:", variables);
		if (userData?.id) {
			setIsLoading(true);
			getGroups({ variables })
				.then(({ data }) => {
					StoreConnectionsInstance.init(data?.groups);
				})
				.catch((err) => {
					console.log("err:", err);
					pushNotification({
						type: "error",
						message: "MutationError",
						error: JSON.stringify(err),
						floatingNotification: true,
					});
				})
				.finally(() => setIsLoading(false));
		}
	}, [userData]);
	// refetch data
	async function refetchGroups(hasIndicator) {
		hasIndicator && setIsLoading(true);
		try {
			const { data } = await refetch(variables);
			StoreConnectionsInstance.init(data?.groups);
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
				floatingNotification: true,
			});
		}
		hasIndicator && setIsLoading(false);
	}
	return { isLoading, error, refetchGroups };
}
