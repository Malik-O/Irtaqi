import { SafeAreaView, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import React from "react";

export default function index() {
	const router = useRouter();
	return (
		<SafeAreaView>
			<Pressable onPress={() => router.push("/home/anotherInHome")}>
				<Text>press</Text>
			</Pressable>
			<Animated.Text
				style={{ fontSize: 30 }}
				sharedTransitionTag="sharedTag"
			>
				Shard Element
			</Animated.Text>
		</SafeAreaView>
	);
}
