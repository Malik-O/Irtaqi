import React, { useState, useEffect } from "react";
// redux
import { useSelector } from "react-redux";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../graphQl";
// hook
import connectToGroupsStore from "./useConnectToStore/instants/connectToGroupsStore";

export default function () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
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
		if (userData?.id) {
			setIsLoading(true);
			getGroups({ variables })
				.then(({ data }) => {
					StoreConnectionsInstance.init(data?.groups);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(
						"there is a problem loading the groups, please try again later.",
					);
				});
		}
	}, [userData]);
	// refetch data
	async function refetchGroups() {
		setIsLoading(true);
		console.log("variables:", variables);
		try {
			const { data } = await refetch(variables);
			console.log("data:", data?.groups);
			StoreConnectionsInstance.init(data?.groups);
		} catch (error) {
			console.log("error:", error);
		}
		setIsLoading(false);
	}
	return { isLoading, error, refetchGroups };
}
