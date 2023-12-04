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
		dispatch(addPlanActions.setState(["fromSurah", val]));
	// validate
	const isValidStateNames = {
		fromVerse: "fromVerse_isValid",
		// startingAt: "startingAt_isValid",
	};
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addPlanActions,
		formData,
	);

	return (
		<Card>
			<ScreenText variant="titleLarge">
				{translate("startingFrom")}
			</ScreenText>
			<TextInput
				label={translate("ayah")}
				stateName="fromVerse"
				isValidStateName={isValidStateNames.fromVerse}
				errorHint={translate("digitsHint")}
				storeAction={addPlanActions}
				formData={formData}
				keyboardType="number-pad"
				defaultValue="1"
			/>
			{/* <DatePickerListItem
				isValidStateName={isValidStateNames.startingAt}
				style={{ marginTop: 10 }}
				title={translate("startingAt")}
				storeAction={addPlanActions}
				datePickerState={[formData.startingAt, "startingAt"]}
				formData={formData}
				errorHint={translate("requiredHint")}
			/> */}
			<PickerWithSearch
				items={
					formData.isReversed ? [...surahNames].reverse() : surahNames
				}
				isReversed={formData.isReversed}
				setSelectedItem={setSelectedItem}
				selectedItem={formData.fromSurah}
				dialogVisible
			/>
		</Card>
	);
}
