import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import React from "react";

export default function index() {
	const router = useRouter();
	return (
		<SafeAreaView
			style={[
				StyleSheet.absoluteFill,
				{ backgroundColor: "rgba(0, 0, 0, 0.4)" },
			]}
		>
			<Pressable onPress={() => router.push("/home")}>
				<Animated.Text
					style={{ fontSize: 30, marginTop: 200 }}
					sharedTransitionTag="sharedTag"
				>
					Shard Element
				</Animated.Text>
			</Pressable>
		</SafeAreaView>
	);
}
