import React, { useState, useEffect } from "react";
// redux
import { useSelector } from "react-redux";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";
// hook
import connectToGroupsStore from "../useConnectToStore/instants/connectToGroupsStore";
import usePush from "../notifications/usePush";

export default function (user_id) {
	const [loading, setIsLoading] = useState(false);
	const [groups, setGroups] = useState([]);
	const pushNotification = usePush();
	// graphQL
	const GetUserGroupsLight = graphQl.queries.GetUserGroupsLight;
	// no cash to fetch data every time the user name changes
	const [getGroupsQuery] = useLazyQuery(GetUserGroupsLight, {
		fetchPolicy: "no-cache",
	});
	// variables
	const variables = { user_id };
	// do the request as soon as the user id loads
	useEffect(() => {
		if (user_id) {
			getGroupsQuery({ variables })
				.then(({ data }) => {
					console.log("user_id:", user_id, data?.groups);
					setGroups(data?.groups);
				})
				.catch((err) => {
					pushNotification({
						type: "error",
						message: "MutationError",
						error: JSON.stringify(err),
						floatingNotification: true,
					});
				})
				.finally(() => setIsLoading(false));
		}
	}, [user_id]);

	return { groups, loading };
}
