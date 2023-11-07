import React from "react";
import { Tabs } from "expo-router";
import { View, useColorScheme } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Circle, Path } from "react-native-svg";

import styles from "../../styles/layout";

export default function () {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarBackground: () => (
					<View>
						<Svg width="375" height="108" viewBox="0 0 375 108">
							<Path
								d="M0 41.3909C0 24.0835 13.0013 9.57048 30.2379 8.00636C66.1347 4.74894 128.577 -0.000481195 187.5 3.65675e-08C246.423 0.000481266 308.865 4.74956 344.762 8.00665C361.998 9.57064 375 24.0837 375 41.3914V74C375 92.7777 359.778 108 341 108H34C15.2223 108 0 92.7777 0 74V41.3909Z"
								fill="#0D171C"
							/>
						</Svg>
					</View>
				),
				// tabBarActiveTintColor: styles.tabBarActiveTintColor,
				// tabBarLabelStyle: styles.text(colorScheme),
				// tabBarStyle: styles.tabBarStyle(colorScheme),
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
