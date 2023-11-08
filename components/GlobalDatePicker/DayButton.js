import { TouchableOpacity } from "react-native";
import styles from "./styles";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../store/globalDate";
import DayText from "./DayText";

export default function ({ collapseClose, day }) {
	const { globalDate } = useSelector((state) => state.globalDate);
	const dispatch = useDispatch();
	// handle button events
	const handlePress = (day) => {
		const date = globalDate.setDate(day);
		dispatch(globalDateActions.set(new Date(date)));
		collapseClose();
	};
	return (
		<TouchableOpacity onPress={() => handlePress(day)}>
			<DayText day={day} isSelected={globalDate.getDate() === day} />
		</TouchableOpacity>
	);
}
