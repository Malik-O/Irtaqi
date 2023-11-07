import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function () {
	const [fontsLoaded] = useFonts({
		p50: require("../../../assets/fonts/p50.ttf"),
	});

	if (!fontsLoaded) return null;

	return (
		<Stack>
			<Stack.Screen name="index" />
		</Stack>
	);
}
