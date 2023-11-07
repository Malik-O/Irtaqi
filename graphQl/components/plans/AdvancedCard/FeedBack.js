import { useCallback } from "react";
import { StyleSheet } from "react-native";
// redux
import { useSelector } from "react-redux";
// hook
import useInstanceHistory from "../../../hook/useInstanceHistory";
import useUpdateInstanceHistory from "../../../hook/useUpdateInstanceHistory";
// utils
import extractISODate from "../../../utils/extractISODate";
import Debouncer from "../../../utils/Debouncer";
// components
import { Slider } from "@miblanchard/react-native-slider";
import GradeInput from "./GradeInput";

export default function ({ amountDone, setAmountDone, allVerses, plan }) {
	// redux states
	const { globalDate } = useSelector((state) => state.globalDate);
	// load history data
	const isHistoryLoading = useInstanceHistory(plan.day);
	// update history action
	const updateInstanceHistory = useUpdateInstanceHistory();
	// Change Amount Event handler
	const changeAmountEvent = useCallback(([amount_done]) => {
		setAmountDone(amount_done);
		const variables = {
			plan_instance_id: plan.day.id,
			amount_done,
			date: extractISODate({ date: globalDate }),
		};
		Debouncer(() => updateInstanceHistory(variables));
	});
	// return
	if (isHistoryLoading) return;
	return (
		<>
			<Slider
				style={{ transform: [{ scaleX: -1 }] }}
				value={amountDone}
				step={1}
				maximumValue={allVerses.length}
				minimumValue={1}
				containerStyle={styles.advancedSlider}
				onValueChange={changeAmountEvent}
				// maximumTrackTintColor="red"
				minimumTrackTintColor="green"
			/>
			<GradeInput amountDone={amountDone} allVerses={allVerses} />
		</>
	);
}
const styles = StyleSheet.create({
	advancedSlider: {
		flexGrow: 1,
		marginHorizontal: 10,
	},
});
