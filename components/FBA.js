import { StyleSheet } from "react-native";
import { AnimatedFAB, FAB } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ({ label = "label", isExtended, href }) {
	const router = useRouter();
	return (
		<FAB
			icon="plus"
			label={label}
			variant="surface"
			extended={isExtended}
			onPress={() => router.push(href)}
			// visible={visible}
			animateFrom="right"
			iconMode="static"
			style={[styles.fabStyle]}
		/>
	);
}

const styles = StyleSheet.create({
	fabStyle: {
		bottom: 100,
		right: 16,
		position: "absolute",
	},
});
