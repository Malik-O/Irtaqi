import { View } from "react-native";
// components
import TextInput from "../TextInput";
import ScreenText from "../ScreenText";
import ListItemRipple from "../ListItemRipple";
import PickerWithSearch from "../PickerWithSearch";
import Card from "../Card";
import Hr from "../Hr";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../store/addPlan";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTranslate from "../../hook/useTranslate";
import { useEffect } from "react";

const days = [
	"saturday",
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
];

export default function (isStepValidName) {
	const translate = useTranslate();
	const dispatch = useDispatch();
	const days = translate("weekDays");
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	// add empty array at first
	useEffect(() => {
		dispatch(addPlanActions.setState(["workingDays", []]));
	}, []);
	// validate
	const isValidStateNames = {
		workingDays: "workingDays_isValid",
	};
	useEffect(() => {
		dispatch(
			addPlanActions.setState([
				isValidStateNames.workingDays,
				!!formData.workingDays?.length,
			]),
		);
	}, [formData.workingDays]);
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addPlanActions,
		formData,
	);
	function isChecked(i) {
		return formData.workingDays && formData.workingDays.indexOf(i) !== -1;
	}
	function toggleItemAction(i) {
		let newVal;
		if (isChecked(i))
			newVal = formData.workingDays.filter((sg) => sg !== i);
		else newVal = [...formData.workingDays, i];
		dispatch(addPlanActions.setState(["workingDays", newVal]));
	}

	return (
		<Card>
			<ScreenText variant="headlineSmall" style={{ marginBottom: 20 }}>
				{translate("workingDays")}
			</ScreenText>
			{days.map((day, i) => (
				<View key={i}>
					<ListItemRipple
						title={day}
						checkbox
						isChecked={isChecked(i)}
						action={() => toggleItemAction(i)}
					/>
					{/* make a spread line between checkboxes */}
					{i + 1 !== days.length && <Hr opacity={0.1} />}
				</View>
			))}
		</Card>
	);
}
