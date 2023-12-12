import { useState } from "react";
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
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const pushNotification = usePush();
	// graphQL
	const GetUserById = graphQl.queries.GetUserById;
	const lazyQuery = useLazyQuery(GetUserById);
	// store connection
	const StoreConnectionsInstance = connectToUserStore();
	// login function
	async function login() {
		setIsSuccess(false);
		// get user id
		try {
			const userId = await getId(userLoginInfo);
			// get user data
			const success = await fetchUserInfo({
				userId,
				lazyQuery,
				StoreConnectionsInstance,
				pushNotification,
			});
			setIsSuccess(success);
		} catch (err) {
			const message = axiosErrorHandler(err);
			pushNotification({
				type: "error",
				message,
			});
		}
	}
	async function loginWrapper() {
		setIsLoading(true);
		await login();
		setIsLoading(false);
	}
	// return
	return { isLoading, isSuccess, loginWrapper };
}
