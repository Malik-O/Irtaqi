import { View, Text } from "react-native";
import { useState } from "react";
// components
import { Button as PaperButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../store/globalDate";

export default function globalDatePicker() {
	// redux
	const { globalDate } = useSelector((state) => state.globalDate);
	const dispatch = useDispatch();
	// date
	const [isGlobalDatePickerVisible, setIsGlobalDatePickerVisible] =
		useState(false);
	const showDatePicker = () => {
		setIsGlobalDatePickerVisible(true);
	};
	const hideDatePicker = () => {
		setIsGlobalDatePickerVisible(false);
	};
	const handleConfirm = (date) => {
		dispatch(globalDateActions.set(date));
		hideDatePicker();
	};

	return (
		<View>
			<PaperButton onPress={showDatePicker} icon="calendar">
				{new Intl.DateTimeFormat("en-GB").format(globalDate)}
			</PaperButton>
			<DateTimePickerModal
				isVisible={isGlobalDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
}
