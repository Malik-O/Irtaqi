export default async function ({
	userId,
	lazyQuery,
	StoreConnectionsInstance,
	pushNotification,
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
		StoreConnectionsInstance.get();
		// success flag
		return true;
	} catch (err) {
		pushNotification({
			type: "error",
			message: "QueryError",
			error: JSON.stringify(err),
		});
	}
}
