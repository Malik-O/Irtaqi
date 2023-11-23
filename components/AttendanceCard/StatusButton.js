import { TouchableOpacity } from "react-native";
import React from "react";
import Animated, { withTiming } from "react-native-reanimated";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
// hook
import useUpdateAttendance from "../../hook/attendance/useUpdateAttendance";
// styles
import styles from "./styles";

export default function ({
	currHistory,
	status,
	colorProgress,
	cardTextStyle,
	student,
	statusList,
}) {
	const updateAttendance = useUpdateAttendance();
	return (
		<TouchableOpacity
			style={[styles.attendanceButton(currHistory?.status === status)]}
			onPress={() => {
				colorProgress.value = withTiming(
					statusList[status || "empty"].progressValue,
				);
				updateAttendance({ user_id: student.id, status });
			}}
		>
			<AnimatedIonicons
				name={statusList[status].icon}
				size={20}
				style={cardTextStyle}
			/>
		</TouchableOpacity>
	);
}
