import {
	View,
	Button,
	useColorScheme,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import ScreenText from "./ScreenText";
import Avatar from "./Avatar";
// hook
import useUpdateAttendance from "../hook/useUpdateAttendance";

// resolvers
function fullName(entity) {
	return `${entity.first_name} ${entity.parent_name || ""}`;
}

export default function ({ student, href }) {
	const colorScheme = useColorScheme();
	const { globalDate } = useSelector((state) => state.globalDate);
	const updateAttendance = useUpdateAttendance();

	const ball = useAnimatedStyle(() => ({
		transform: [{ scale: 5 }],
	}));
	// router
	const router = useRouter();
	return (
		<View style={styles.cardContainer(colorScheme)}>
			<View
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
			/>
			<View style={styles.halfContainer}>
				<Avatar />
				<ScreenText variant="titleMedium" style={styles.name}>
					{fullName(student)}
				</ScreenText>
			</View>
			<View style={styles.halfContainer}>
				{/* <TouchableOpacity
					style={[styles.attendanceButton, styles.presentButton]}
					onPress={() => {}}
				>
					<Ionicons
						name="checkmark-outline"
						size={20}
						color="white"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.attendanceButton, styles.absentButton]}
					onPress={() => {}}
				>
					<Ionicons name="close-outline" size={20} color="white" />
				</TouchableOpacity> */}
			</View>
			<MaskedView
				maskElement={
					<View
						style={{
							height: 100,
							width: 100,
							// transform: [{ scale: 2 }],
							backgroundColor: "black",
							// position: "absolute",
							// top: 0,
							// left: 0,
						}}
					/>
				}
			>
				<View
					style={{
						height: 100,
						width: 100,
						borderRadius: 20,
						backgroundColor: "red",
						// transform: [{ scale: 5 }],
						position: "absolute",
						top: 0,
						left: 0,
					}}
				/>
			</MaskedView>
			{/* <Button
						title="att"
						onPress={() =>
							updateAttendance({
								userID: student.id,
								status: "a",
								date: globalDate,
							})
						}
					/> */}
		</View>
	);
}
const _buttonSize = 40;

const styles = StyleSheet.create({
	cardContainer: (theme) => ({
		backgroundColor: theme === "light" ? "#ffffff" : "#1F2C33",
		margin: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 20,
		flex: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		// alignSelf: "center",
	}),
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
	absentButton: { backgroundColor: "red" },
	presentButton: { backgroundColor: "green" },
});
