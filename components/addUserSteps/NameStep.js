// components
import TextInput from "./TextInput";
import Card from "../Card";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";

export default function (isStepValidName) {
	const isValidStateNames = {
		first_name: "first_name_isValid",
		parent_name: "parent_name_isValid",
		rest_of_name: "rest_of_name_isValid",
	};
	useAddUserValidate(isValidStateNames, isStepValidName);

	return (
		<Card>
			<TextInput
				stateName="first_name"
				isValidStateName={isValidStateNames.first_name}
			/>
			<TextInput
				stateName="parent_name"
				isValidStateName={isValidStateNames.parent_name}
			/>
			<TextInput
				stateName="rest_of_name"
				isValidStateName={isValidStateNames.rest_of_name}
			/>
		</Card>
	);
}
