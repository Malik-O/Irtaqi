// components
import TextInput from "../TextInput";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
import { addPlanActions } from "../../store/addPlan";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTranslate from "../../hook/useTranslate";

export default function (isStepValidName) {
	const translate = useTranslate();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	// validate
	const isValidStateNames = {
		first_name: "first_name_isValid",
	};
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addPlanActions,
		formData,
	);

	return (
		<Card>
			<TextInput
				stateName="first_name"
				isValidStateName={isValidStateNames.first_name}
				errorHint={translate("wordHint")}
				storeAction={addPlanActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
			/>
		</Card>
	);
}
