import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../store/addUser";

export default function (
	isValidStateNames,
	isStepValidName,
	storeAction,
	formData,
) {
	// redux
	// const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	// is valid
	useEffect(() => {
		const newIsValidValue = Object.values(isValidStateNames)
			.map((v) => formData[v])
			.every((v) => v);
		if (newIsValidValue !== formData[isStepValidName])
			dispatch(storeAction.setState([isStepValidName, newIsValidValue]));
	}, [formData]);
}
