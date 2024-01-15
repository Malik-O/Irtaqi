import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../store/addUser";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../graphQl";
// hooks
import usePush from "./notifications/usePush";
import useTranslate from "./useTranslate";

export default function () {
	const translate = useTranslate();
	const pushNotification = usePush();
	const [isLoading, setIsLoading] = useState(false);
	// redux states
	const dispatch = useDispatch();
	const { formData } = useSelector((state) => state.addUser);
	// graphQL
	const IsNationalIDExists = graphQl.queries.IsNationalIDExists;
	const [
		getIsNationalIDExists,
		{ loading, error: graphQlError, data: graphQlData, refetch },
	] = useLazyQuery(IsNationalIDExists);
	// fetch
	function isNationalIDExists() {
		// variables
		const variables = { nationalID: formData.nationalID };
		if (formData.nationalID?.length !== 14)
			return addUserActions.setState([
				"nationalIDErrorHint",
				translate("nationalIDHint"),
			]);
		setIsLoading(true);
		getIsNationalIDExists({ variables })
			.then(({ data }) => {
				setIsLoading(false);
				dispatch(
					addUserActions.setState([
						"nationalIDErrorHint",
						data.isNationalIDExists
							? translate("nationalIDExisted")
							: "",
					]),
				);
			})
			.catch((err) => {
				setIsLoading(false);
				pushNotification({
					type: "error",
					message: "QueryError",
					error: JSON.stringify(err),
				});
			});
	}
	useEffect(() => {
		isNationalIDExists();
	});

	return { isLoading, isNationalIDExists };
}
