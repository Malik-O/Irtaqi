import { View } from "react-native";
import React, { useMemo } from "react";
import Animated, {
	useAnimatedStyle,
	interpolateColor,
	useSharedValue,
	withTiming,
	useDerivedValue,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// components
import Avatar from "../Avatar";
import StatusButton from "./StatusButton";
// hook
import useTheme from "../../hook/useTheme";
// utils
import sameHistoryCondition from "../../utils/sameHistoryCondition";
// styles
import styles from "./styles";

// resolvers
function fullName(entity) {
	return `${entity.first_name} ${entity.parent_name || ""}`;
}

const statusList = {
	empty: { progressValue: 0 },
	present: { icon: "checkmark-outline", progressValue: 1 },
	absent: { icon: "close-outline", progressValue: 2 },
};

export default function ({ student, href }) {
	const theme = useTheme();
	// redux
	const { globalDate } = useSelector((state) => state.globalDate);
	const { attendanceHistory } = useSelector((state) => state.groups);
	// filter out the history
	const currHistory = useMemo(() => {
		// console.log("attendanceHistory:", attendanceHistory);
		return attendanceHistory.filter((h) =>
			sameHistoryCondition(h, {
				...student,
				date: globalDate,
			}),
		)?.[0];
	}, [globalDate, attendanceHistory]);
	// color styles
	const colorProgress = useSharedValue(0);
	useDerivedValue(() => {
		colorProgress.value = withTiming(
			(statusList[currHistory?.status] || statusList["empty"])
				.progressValue,
		);
	}, [currHistory]);
	const cardStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorProgress.value,
			[0, 1, 2],
			theme.attendanceCardColors,
		),
	}));
	const cardTextStyle = useAnimatedStyle(() => ({
		color: currHistory?.status
			? theme.theme.dark.secondary
			: theme.reverse.secondary,
	}));
	return (
		<Animated.View style={[styles.cardContainer, cardStyle]}>
			<View style={styles.halfContainer}>
				<Avatar />
				<Animated.Text style={[cardTextStyle, { fontSize: 20 }]}>
					{fullName(student)}
				</Animated.Text>
			</View>
			<View style={styles.halfContainer}>
				<StatusButton
					status="present"
					currHistory={currHistory}
					colorProgress={colorProgress}
					cardTextStyle={cardTextStyle}
					student={student}
					statusList={statusList}
				/>
				<StatusButton
					status="absent"
					currHistory={currHistory}
					colorProgress={colorProgress}
					cardTextStyle={cardTextStyle}
					student={student}
					statusList={statusList}
				/>
			</View>
		</Animated.View>
	);
}
