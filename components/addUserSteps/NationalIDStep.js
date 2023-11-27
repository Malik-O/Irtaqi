// components
import TextInput from "../TextInput";
import DatePickerListItem from "../DatePickerListItem";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";

export default function (isStepValidName) {
	const translate = useTranslate();
	// redux
	const { formData } = useSelector((state) => state.addUser);
	// is valid
	const isValidStateNames = {
		nationalID: "nationalID_isValid",
		dateOfBirth: "dateOfBirth_isValid",
	};
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addUserActions,
		formData,
	);

	return (
		<Card>
			<DatePickerListItem
				isValidStateName={isValidStateNames.dateOfBirth}
				style={{ marginTop: 10 }}
				title={translate("dateOfBirth")}
				storeAction={addUserActions}
				datePickerState={[formData.dateOfBirth, "dateOfBirth"]}
				formData={formData}
				errorHint={translate("requiredHint")}
			/>
			<TextInput
				stateName="nationalID"
				formData={formData}
				isValidStateName={isValidStateNames.nationalID}
				keyboardType="number-pad"
				regex={/^[\u0660-\u06690-9]{14}$/}
				storeAction={addUserActions}
				errorHint={translate("nationalIDHint")}
			/>
		</Card>
	);
}
