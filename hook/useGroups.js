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
		{ graphQlLoading, error: graphQlError, data: graphQlData },
	] = useLazyQuery(GetUserGroups);

	// const data = await getGroups({ variables: { user_id: userData.id } });

	useEffect(() => {
		setIsLoading(true);
		getGroups({ variables: { user_id: userData.id } })
			.then(({ data }) => {
				// setGroups(data.groups);
				StoreConnectionsInstance.init(data.groups);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(
					"there is a problem loading the groups, please try again later.",
				);
			});
	}, []);

	return { isLoading, error };
}
