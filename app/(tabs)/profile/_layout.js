import { Stack } from "expo-router";
import { View } from "react-native";

export default function () {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
