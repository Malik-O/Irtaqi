import { useState, useEffect } from "react";
// actions
import axiosErrorHandler from "./requests/axiosErrorHandler";
import getId from "./actions/getId";
import fetchUserInfo from "./actions/fetchUserInfo";
// hook
import connectToUserStore from "../useConnectToStore/instants/connectToUserStore";
import usePush from "../notifications/usePush";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";

export default function (userLoginInfo) {
	const pushNotification = usePush();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	// graphQL
	const GetUserById = graphQl.queries.GetUserById;
	const lazyQuery = useLazyQuery(GetUserById);
	// store connection
	const StoreConnectionsInstance = connectToUserStore();
	// login function
	async function login() {
		// get user id
		try {
			var userId = await getId(userLoginInfo);
		} catch (err) {
			axiosErrorHandler(err, setError);
			pushNotification({
				type: "error",
				message: err.code,
			});
		}
		//! graphQl fetch (error catching)
		try {
			await fetchUserInfo({
				userId,
				lazyQuery,
				StoreConnectionsInstance,
			});
		} catch (err) {
			pushNotification({
				type: "error",
				message: "QueryError",
				error: JSON.stringify(err),
			});
		}
	}
	async function loginWrapper() {
		setIsLoading(true);
		await login();
		setIsLoading(false);
	}
	// return
	return { isLoading, error, loginWrapper };
}
