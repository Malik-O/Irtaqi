export default async function ({
	userId,
	lazyQuery,
	StoreConnectionsInstance,
	pushNotification,
	redirectAction,
	router,
	redirectURL,
}) {
	if (!userId) return;
	const [
		getUserInfo,
		{ graphQlLoading, error: graphQlError, data: graphQlData },
	] = lazyQuery;
	// do the query
	try {
		const {
			data: { user },
		} = await getUserInfo({ variables: { id: userId } });
		// update the user data after loading
		delete user.__typename;
		StoreConnectionsInstance.init({ id: userId, ...user });
		// success flag
		return true;
	} catch (err) {
		console.log("err:", err);
		pushNotification({
			type: "error",
			message: "QueryError",
			error: JSON.stringify(err),
		});
	}
}
