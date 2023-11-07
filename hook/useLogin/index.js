import { useState, useEffect } from "react";
// actions
import axiosErrorHandler from "./requests/axiosErrorHandler";
import getId from "./actions/getId";
import fetchUserInfo from "./actions/fetchUserInfo";
// hook
import connectToUserStore from "../useConnectToStore/instants/connectToUserStore";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";

export default function (userLoginInfo) {
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
		} catch (error) {
			axiosErrorHandler(error, setError);
		}
		//! graphQl fetch (error catching)
		try {
			await fetchUserInfo({
				userId,
				lazyQuery,
				StoreConnectionsInstance,
			});
		} catch (error) {
			console.log(error);
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
