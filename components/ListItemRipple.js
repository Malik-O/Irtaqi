import { View, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// paper
import {
	TouchableRipple,
	TextInput,
	Button as PaperButton,
} from "react-native-paper";
// components
import ScreenText from "./ScreenText";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function CheckboxComponent({ isChecked, colorScheme }) {
	if (!isChecked) return;
	return (
		<Ionicons
			name="checkmark-outline"
			color={colorScheme === "light" ? "black" : "white"}
			size={20}
		/>
	);
}

function ListContentComponent({ props, isRTL }) {
	const {
		isChecked,
		checkbox,
		inputState,
		storeAction,
		selectedItem,
		// date picker state
		datePickerState,
		isDatePickerVisible,
		handleConfirm,
		hideDatePicker,
	} = props;
	const colorScheme = useColorScheme();
	// redux
	const dispatch = useDispatch();
	// from select list item
	if (selectedItem)
		return (
			<View style={styles.text(isRTL)}>
				<ScreenText style={{ paddingHorizontal: 4 }} numberOfLines={1}>
					{selectedItem}
				</ScreenText>
				<Ionicons
					name={`chevron-${isRTL ? "back" : "forward"}-outline`}
					color={colorScheme === "light" ? "black" : "white"}
					size={20}
				/>
			</View>
		);
	// input text list item
	if (inputState) {
		const [inputStateValue, inputStateObj] = inputState;
		// change input state value
		const setInputStateValue = (val) =>
			dispatch(storeAction.setState([inputStateObj, val]));
		return (
			<TextInput
				value={inputStateValue}
				onChangeText={setInputStateValue}
				style={{ textAlign: "center" }}
			/>
		);
	}
	// multi choice list item
	if (checkbox)
		return (
			<CheckboxComponent
				isChecked={isChecked}
				colorScheme={colorScheme}
			/>
		);
	// date picker list item
	if (datePickerState) {
		const [datePickerStateValue, datePickerStateObj] = datePickerState;
		return (
			<View style={styles.text(isRTL)}>
				<ScreenText style={{ paddingHorizontal: 4 }} numberOfLines={1}>
					{JSON.stringify(datePickerStateValue)}
				</ScreenText>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
				/>
			</View>
		);
	}
}

export default function ListItemRipple(props) {
	// redux
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// date picker
	// if (props.datePickerState) {
	// 	console.log(props);
	// 	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	// 	props.isDatePickerVisible = isDatePickerVisible;
	// 	props.action = () => {
	// 		setDatePickerVisibility(true);
	// 	};
	// 	props.hideDatePicker = () => {
	// 		setDatePickerVisibility(false);
	// 	};
	// }

	return (
		<TouchableRipple onPress={props.action}>
			<View style={styles.view(isRTL)}>
				<ScreenText>{props.title}</ScreenText>
				<ListContentComponent props={props} isRTL={isRTL} />
			</View>
		</TouchableRipple>
	);
}

const styles = StyleSheet.create({
	view: (rtl) => ({
		flexDirection: rtl ? "row" : "row-reverse",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 10,
	}),
	text: (rtl) => ({
		flexDirection: rtl ? "row" : "row-reverse",
		alignItems: "center",
		justifyContent: "space-between",
		opacity: 0.8,
	}),
});
