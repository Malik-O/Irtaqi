import { View, Text } from "react-native";
import React, { useState } from "react";
// redux
import { useDispatch } from "react-redux";
// components
import ListItemRipple from "./ListItemRipple";
import ScreenText from "./ScreenText";
//
import useTheme from "../hook/useTheme";

export default function DatePickerListItem({
	style,
	title,
	storeAction,
	datePickerState,
	isValidStateName,
	formData,
	errorHint,
}) {
	const theme = useTheme();
	const [datePickerStateValue, datePickerStateObj] = datePickerState;
	// redux
	const dispatch = useDispatch();
	// datepicker
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	// actions
	function validate(val) {
		const isValid = !!(val || datePickerStateValue);
		// console.log("s:", val, datePickerStateValue);
		dispatch(storeAction.setState([isValidStateName, isValid]));
	}
	function showDatePicker() {
		setDatePickerVisibility(true);
	}
	function hideDatePicker() {
		setDatePickerVisibility(false);
		validate();
	}
	function setDate(val) {
		dispatch(storeAction.setState([datePickerStateObj, val]));
	}
	function handleConfirm(date) {
		setDate(date);
		hideDatePicker();
		validate(date);
	}

	return (
		<View style={style}>
			<ListItemRipple
				title={title}
				datePickerState={datePickerState}
				action={showDatePicker}
				isDatePickerVisible={isDatePickerVisible}
				hideDatePicker={hideDatePicker}
				handleConfirm={handleConfirm}
			/>
			{formData[isValidStateName] === false ? (
				<ScreenText style={{ color: theme.error }}>
					{errorHint}
				</ScreenText>
			) : null}
		</View>
	);
}
