// components
import TextInput from "../TextInput";
import ScreenText from "../ScreenText";
import DatePickerListItem from "../DatePickerListItem";
import PickerWithSearch from "../PickerWithSearch";
import Card from "../Card";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../store/addPlan";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTranslate from "../../hook/useTranslate";

export default function (isStepValidName) {
	const translate = useTranslate();
	const dispatch = useDispatch();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	const { surahNames } = useSelector((state) => state.quran);
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["toSurah", val]));
	// validate
	const isValidStateNames = {
		weeks: "weeks_isValid",
		planTitle: "planTitle_isValid",
		startingDate: "startingDate_isValid",
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
				label={translate("planTitle")}
				placeholder={translate("planTitlePlaceholder")}
				stateName="planTitle"
				isValidStateName={isValidStateNames.planTitle}
				errorHint={translate("wordHint")}
				storeAction={addPlanActions}
				formData={formData}
			/>
			<TextInput
				label={translate("weeks")}
				stateName="weeks"
				isValidStateName={isValidStateNames.weeks}
				errorHint={translate("digitsHint")}
				storeAction={addPlanActions}
				formData={formData}
				keyboardType="number-pad"
			/>
			<DatePickerListItem
				isValidStateName={isValidStateNames.startingDate}
				style={{ marginTop: 10 }}
				title={translate("startingDate")}
				storeAction={addPlanActions}
				datePickerState={[formData.startingDate, "startingDate"]}
				formData={formData}
				errorHint={translate("requiredHint")}
			/>
		</Card>
	);
}
