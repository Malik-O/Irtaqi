import { Stack } from "expo-router";

export default function () {
	return (
		<Stack screenOptions={{ header: () => null }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
