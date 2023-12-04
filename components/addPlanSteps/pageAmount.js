import { View, Switch, Pressable } from "react-native";
// components
// import { Switch } from 'react-native-paper';
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
import { useEffect } from "react";

export default function (isStepValidName) {
	const translate = useTranslate();
	const dispatch = useDispatch();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	// validate
	const isValidStateNames = {
		amount: "amount_isValid",
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
				label={translate("pagesPerDay")}
				stateName="amount"
				defaultValue="1"
				isValidStateName={isValidStateNames.amount}
				errorHint={translate("digitsHint")}
				storeAction={addPlanActions}
				formData={formData}
				keyboardType="number-pad"
			/>
			<Pressable
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
					alignContent: "center",
					marginTop: 20,
				}}
			>
				<ScreenText style={{ alignSelf: "center" }}>
					{translate("hasRabt")}
				</ScreenText>
				<Switch
					value={formData.hasRabt}
					onValueChange={(val) =>
						dispatch(addPlanActions.setState(["hasRabt", val]))
					}
				/>
			</Pressable>
			{formData.hasRabt ? (
				<TextInput
					label={translate("rabtPages")}
					stateName="rabtAmount"
					defaultValue="5"
					errorHint={translate("digitsHint")}
					storeAction={addPlanActions}
					formData={formData}
					keyboardType="number-pad"
				/>
			) : null}
		</Card>
	);
}
