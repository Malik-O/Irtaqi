import { Pressable, View } from "react-native";
import styles from "./styles";
// redux
import { useSelector, useDispatch } from "react-redux";
import DayText from "./DayText";
import { useEffect } from "react";

export default function ({ handlePress, day }) {
	useEffect(() => {
		"updated";
	});
	const { globalDate } = useSelector((state) => state.globalDate);
	return (
		<Pressable onPress={() => handlePress(day)}>
			<DayText day={day} isSelected={globalDate.getDate() === day} />
		</Pressable>
	);
}
