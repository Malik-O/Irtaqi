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
//utils
import capitalize from "../../utils/capitalize";

export default function (isStepValidName) {
	const translate = useTranslate();
	const dispatch = useDispatch();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	const directions = [
		{ text: translate("toAl_nas"), value: 0 },
		{ text: translate("toAl_fatihah"), value: 1 },
	];
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["isReversed", val]));

	return (
		<Card>
			<ScreenText variant="titleLarge">
				{translate("direction", true)}
			</ScreenText>
			<PickerWithSearch
				items={directions}
				setSelectedItem={setSelectedItem}
				selectedItem={formData.isReversed}
				dialogVisible
			/>
		</Card>
	);
}
