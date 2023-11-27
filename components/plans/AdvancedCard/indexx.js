import { View, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
// redux
import { useSelector } from "react-redux";
// utils
import sameHistoryCondition from "../../../utils/sameHistoryCondition";
import { versesKeysArr, verseName } from "../../../utils/verse";
import extractISODate from "../../../utils/extractISODate";
import Debouncer from "../../../utils/Debouncer";
// components
import ScreenText from "../../ScreenText";
import CoolCardSlider from "../../CoolCardSlider";
import { useCallback } from "react";
// hook
import useInstanceHistory from "../../../hook/plans/useInstanceHistory";
import useUpdateInstanceHistory from "../../../hook/plans/useUpdateInstanceHistory";

export default function ({ plan }) {
	const selectedAmountDoneState = useState(1);
	const [amountDone, setAmountDone] = selectedAmountDoneState;
	// redux states
	const { instancesHistory } = useSelector((state) => state.plans);
	const { globalDate } = useSelector((state) => state.globalDate);
	// quran redux store
	const { surahAdj } = useSelector((state) => state.quran);
	const allVerses = useMemo(() => versesKeysArr(plan, surahAdj), [plan]);
	// get the current day history
	useEffect(() => {
		const currentDayHistory = instancesHistory.filter((instance) =>
			sameHistoryCondition(instance, plan.day),
		)?.[0];
		if (currentDayHistory) setAmountDone(currentDayHistory.amount_done);
		else setAmountDone(1);
	}, [instancesHistory, globalDate, plan]);
	// load history data
	const isHistoryLoading = useInstanceHistory(plan.day);
	// update history action
	const updateInstanceHistory = useUpdateInstanceHistory();
	// Change Amount Event handler
	const changeAmountEvent = useCallback((newAmountDone) => {
		// console.log("newAmountDone:", newAmountDone, allVerses);
		// setAmountDone(newAmountDone);
		const variables = {
			plan_instance_id: plan.day.id,
			amount_done: newAmountDone + 1,
			date: extractISODate({ date: globalDate }),
		};
		// console.log({ variables });
		Debouncer(() => updateInstanceHistory(variables));
	}, []);

	return (
		<CoolCardSlider
			style={styles.advancedAreaContainer}
			selectedNumberState={selectedAmountDoneState}
			onSlide={changeAmountEvent}
			list={[0, 1, 2, 3, 4, 5]}
		>
			<ScreenText variant="bodyLarge">
				{verseName(allVerses, amountDone + 1)} {amountDone}
			</ScreenText>
		</CoolCardSlider>
	);
}

const styles = StyleSheet.create({
	advancedAreaContainer: {
		marginTop: 20,
	},
});
