import { useCallback } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
// redux
import { useSelector } from "react-redux";
// hook
import useInstanceHistory from "../../../hook/plans/useInstanceHistory";
import useUpdateInstanceHistory from "../../../hook/plans/useUpdateInstanceHistory";
// utils
import extractISODate from "../../../utils/extractISODate";
import Debouncer from "../../../utils/Debouncer";
// components
import { Slider } from "@miblanchard/react-native-slider";
import GradeInput from "./GradeInput";
// import GradeInput from "../../CoolCardSlider";

export default function ({
	amountDone: [amountDone, setAmountDone],
	grade: [grade, setGrade],
	allVerses,
	plan,
}) {
	// redux states
	const { globalDate } = useSelector((state) => state.globalDate);
	// load history data
	const isHistoryLoading = useInstanceHistory(plan.day);
	// update history action
	const updateInstanceHistory = useUpdateInstanceHistory();
	// Change Amount Event handler
	const onchangeEvent = useCallback((amount_done, gradeNewValue) => {
		amount_done ||= amountDone;
		setAmountDone(amount_done);
		const variables = {
			plan_instance_id: plan.day.id,
			amount_done,
			grade: gradeNewValue,
			date: extractISODate({ date: globalDate }),
		};
		// console.log({ variables });
		Debouncer(() => updateInstanceHistory(variables));
	});
	// return
	if (isHistoryLoading) return <ActivityIndicator />;
	return (
		<>
			<Slider
				style={{ transform: [{ scaleX: -1 }] }}
				value={amountDone}
				step={1}
				maximumValue={allVerses.length}
				minimumValue={1}
				containerStyle={styles.advancedSlider}
				onValueChange={onchangeEvent}
				// maximumTrackTintColor="red"
				minimumTrackTintColor="green"
			/>
			<GradeInput
				onchangeEvent={onchangeEvent}
				amountDone={amountDone}
				grade={[grade, setGrade]}
				allVerses={allVerses}
			/>
		</>
	);
}
const styles = StyleSheet.create({
	advancedSlider: {
		flexGrow: 1,
		marginHorizontal: 10,
	},
});
