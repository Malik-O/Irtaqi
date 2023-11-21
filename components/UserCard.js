import {
	View,
	Text,
	Button,
	useColorScheme,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import Animated, {
	useAnimatedStyle,
	interpolateColor,
	useSharedValue,
	withTiming,
	useDerivedValue,
} from "react-native-reanimated";
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
// redux
import { useSelector } from "react-redux";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import ScreenText from "./ScreenText";
import Avatar from "./Avatar";
// hook
import useUpdateAttendance from "../hook/attendance/useUpdateAttendance";
import useTheme from "../hook/useTheme";
// utils
import extractISODate from "../utils/extractISODate";
import sameHistoryCondition from "../utils/sameHistoryCondition";

// resolvers
function fullName(entity) {
	return `${entity.first_name} ${entity.parent_name || ""}`;
}

export default function ({ student, href }) {
	const theme = useTheme();
	// redux
	const { globalDate } = useSelector((state) => state.globalDate);
	const { attendanceHistory } = useSelector((state) => state.groups);
	const updateAttendance = useUpdateAttendance();
	// filter out the history
	const currHistory = useMemo(() => {
		return attendanceHistory.filter((h) =>
			sameHistoryCondition(h, {
				...student,
				date: globalDate,
			}),
		)?.[0];
	}, [globalDate, attendanceHistory]);
	//
	const progress = useSharedValue(0);
	useDerivedValue(() => {
		progress.value = withTiming(currHistory?.status === "attended" ? 0 : 1);
	}, [currHistory]);
	const attendanceCardColors = ["#4FAB52", "#AB4F4F"];
	const cardStyle = useAnimatedStyle(() => ({
		backgroundColor: currHistory?.status
			? interpolateColor(progress.value, [0, 1], attendanceCardColors)
			: theme.cardColor,
	}));
	const cardTextStyle = useAnimatedStyle(() => ({
		color: currHistory?.status
			? theme.theme.dark.secondary
			: theme.reverse.secondary,
	}));
	return (
		<Animated.View style={[styles.cardContainer, cardStyle]}>
			{/* <ScreenText reverse>{currHistory?.status}</ScreenText> */}
			{/* <View
				style={{
					height: "100%",
					width: "100%",
					borderRadius: 20,
					// backgroundColor: "red",
					// transform: [{ scale: 5 }],
					position: "absolute",
					top: 0,
					left: 0,
				}}
			/> */}
			<View style={styles.halfContainer}>
				<Avatar />
				<Animated.Text style={[cardTextStyle, { fontSize: 20 }]}>
					{fullName(student)}
				</Animated.Text>
			</View>
			<View style={styles.halfContainer}>
				<TouchableOpacity
					style={[styles.attendanceButton, styles.presentButton]}
					onPress={() => {
						progress.value = withTiming(0);
						updateAttendance({
							user_id: student.id,
							status: "attended",
						});
					}}
				>
					<AnimatedIonicons
						name="checkmark-outline"
						size={20}
						style={cardTextStyle}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.attendanceButton, styles.absentButton]}
					onPress={() => {
						progress.value = withTiming(1);
						updateAttendance({
							user_id: student.id,
							status: "absent",
						});
					}}
				>
					<AnimatedIonicons
						name="close-outline"
						size={20}
						style={cardTextStyle}
					/>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
}
const _buttonSize = 40;

const styles = StyleSheet.create({
	cardContainer: {
		// height: 200,
		// backgroundColor: theme === "light" ? "#ffffff" : "#1F2C33",
		// backgroundColor: status === "present" ? "green" : "red",
		margin: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 20,
		// flex: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		// alignSelf: "center",
	},
	// info
	halfContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 15,
	},
	// name: { marginHorizontal: 20 },
	// buttons
	attendanceButton: {
		width: _buttonSize,
		height: _buttonSize,
		borderRadius: _buttonSize,
		justifyContent: "center",
		alignItems: "center",
	},
	absentButton: {},
	presentButton: {},
});
