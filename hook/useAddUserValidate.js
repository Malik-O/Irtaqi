import { useEffect } from "react";
// redux
import { useDispatch } from "react-redux";

export default function (
	isValidStateNames,
	isStepValidName,
	storeAction,
	formData,
	updateStoreFun,
) {
	const dispatch = useDispatch();
	// is valid
	useEffect(() => {
		const newIsValidValue = Object.values(isValidStateNames)
			.map((v) => formData[v])
			.every((v) => v);
		// console.log("newIsValidValue:", isValidStateNames, newIsValidValue);
		if (newIsValidValue !== formData[isStepValidName]) {
			if (updateStoreFun)
				updateStoreFun(isStepValidName, newIsValidValue);
			else
				dispatch(
					storeAction.setState([isStepValidName, newIsValidValue]),
				);
		}
	}, [formData]);
}
