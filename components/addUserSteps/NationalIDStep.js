// components
import TextInput from "./TextInput";
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
	};
	useAddUserValidate(isValidStateNames, isStepValidName);

	return (
		<Card>
			<DatePickerListItem
				style={{ marginTop: 10 }}
				title={translate("dateOfBirth")}
				storeAction={addUserActions}
				datePickerState={[formData.dateOfBirth, "dateOfBirth"]}
			/>
			<TextInput
				stateName="nationalID"
				isValidStateName={isValidStateNames.nationalID}
				keyboardType="number-pad"
				regex={/\d+/}
			/>
		</Card>
	);
}
