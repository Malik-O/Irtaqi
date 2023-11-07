export default async function ({
	userId,
	lazyQuery,
	StoreConnectionsInstance,
}) {
	if (!userId) return;
	const [
		getUserInfo,
		{ graphQlLoading, error: graphQlError, data: graphQlData },
	] = lazyQuery;
	// do the query
	const { data } = await getUserInfo({ variables: { id: userId } });
	// update the user data after loading
	delete data.user.__typename;
	StoreConnectionsInstance.init({ id: userId, ...data.user });
}
