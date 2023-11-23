import React from "react";
import { Tabs } from "expo-router";
import { View, useColorScheme, Dimensions } from "react-native";
// component
import { Path, Skia, Canvas, Group } from "@shopify/react-native-skia";
import Ionicons from "@expo/vector-icons/Ionicons";
//utils
import { vec2 } from "../../utils/pathPoints";
// hook
import useTheme from "../../hook/useTheme";
// styles
import styles, {
	tabBarBubbleShift,
	MAGIC_NUM,
	tabBarHeight,
} from "../../styles/layout";
const { width } = Dimensions.get("window");
// const height = 200;

function TabBarBG() {
	const theme = useTheme();
	const path = Skia.Path.Make();
	const R = 1;
	// calc point
	const C = R * MAGIC_NUM;
	const middlePoint = vec2(width / 2, 0);
	const endPoint = vec2(width, tabBarBubbleShift);
	const c1 = vec2(middlePoint.x - C, middlePoint.y);
	const c2 = vec2(endPoint.x, endPoint.y);
	// add points
	path.moveTo(0, tabBarBubbleShift);
	path.cubicTo(c1.x, c1.y, c2.x, c2.y, endPoint.x, endPoint.y);
	// path.lineTo(width / 2, 0);
	// path.lineTo(width, tabBarBubbleShift);
	path.lineTo(width, tabBarHeight);
	path.lineTo(0, tabBarHeight);
	path.close();
	return (
		<Canvas style={styles.canvas}>
			<Path path={path} color={theme.secondary} />
		</Canvas>
	);
}
export default function () {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarBackground: TabBarBG,
				// tabBarActiveTintColor: styles.tabBarActiveTintColor,
				// tabBarLabelStyle: styles.text(colorScheme),
				tabBarStyle: styles.tabBarStyle(colorScheme),
				headerStyle: styles.barBackground(colorScheme),
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarBadge: 3,
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={`home${!focused ? "-outline" : ""}`}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="groups"
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={`people-circle${!focused ? "-outline" : ""}`}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="quran"
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<View
							styles={{
								width: 50,
								height: 50,
								backgroundColor: "red",
								borderRadius: 50,
								position: "absolute",
								top: -50,
							}}
						>
							<Ionicons
								name={`book${!focused ? "-outline" : ""}`}
								size={size * 2}
								color={color}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={`notifications${!focused ? "-outline" : ""}`}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={`person-circle${!focused ? "-outline" : ""}`}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
