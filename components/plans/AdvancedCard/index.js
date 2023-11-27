import { View, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Card } from "react-native-paper";
// redux
import { useSelector } from "react-redux";
// utils
import sameHistoryCondition from "../../../utils/sameHistoryCondition";
import { versesKeysArr, verseName } from "../../../utils/verse";
// components
import ScreenText from "../../ScreenText";
import FeedBack from "./FeedBack";

export default function ({ plan }) {
	const [amountDone, setAmountDone] = useState(1);
	const [grade, setGrade] = useState(0);
	// redux states
	const { instancesHistory } = useSelector((state) => state.plans);
	const { globalDate } = useSelector((state) => state.globalDate);
	// quran redux store
	const { surahAdj } = useSelector((state) => state.quran);
	const allVerses = useMemo(() => versesKeysArr(plan, surahAdj), [plan]);
	// get the current day history
	useEffect(() => {
		const currentDayHistory = instancesHistory.filter((instance) => {
			return sameHistoryCondition(instance, plan.day);
		})?.[0];
		// console.log(
		// 	"currentDayHistory:",
		// 	[instancesHistory, plan.day],
		// 	currentDayHistory,
		// );
		if (currentDayHistory) {
			setAmountDone(currentDayHistory.amount_done);
			setGrade(currentDayHistory.grade);
		} else setAmountDone(1);
	}, [instancesHistory, globalDate, plan]);

	return (
		<View style={styles.advancedAreaContainer}>
			<Card style={{ marginTop: 20 }} mode="contained">
				<Card.Content style={styles.advancedCardContent}>
					<ScreenText variant="bodyLarge">
						{amountDone} {grade}
					</ScreenText>
					<ScreenText variant="bodyLarge">
						{verseName(allVerses, amountDone)}
					</ScreenText>
					<FeedBack
						allVerses={allVerses}
						amountDone={[amountDone, setAmountDone]}
						grade={[grade, setGrade]}
						plan={plan}
					/>
				</Card.Content>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	advancedAreaContainer: {
		paddingHorizontal: 30,
	},
	advancedCardContent: {
		marginTop: 20,
	},
});
