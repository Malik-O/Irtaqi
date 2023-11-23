import { View, Text } from "react-native";
import React, { useState } from "react";
// redux
import { useDispatch } from "react-redux";
// components
import ListItemRipple from "./ListItemRipple";

export default function DatePickerListItem({
	style,
	title,
	storeAction,
	datePickerState,
}) {
	const [datePickerStateValue, datePickerStateObj] = datePickerState;
	// redux
	const dispatch = useDispatch();
	// datepicker
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};
	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};
	const setDate = (val) =>
		dispatch(storeAction.setState([datePickerStateObj, val]));
	const handleConfirm = (date) => {
		setDate(date);
		hideDatePicker();
	};

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
		</View>
	);
}
