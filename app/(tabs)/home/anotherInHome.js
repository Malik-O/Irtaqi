import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

export default function anotherInHome() {
	const router = useRouter();
	return (
		<BlurView
			intensity={20}
			style={{
				justifyContent: "center",
				alignItems: "center",
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
			}}
		>
			<Pressable onPress={() => router.back()}>
				<Animated.Text
					style={{ color: "white", fontSize: 40 }}
					sharedTransitionTag="sharedTag"
				>
					Shard Element
				</Animated.Text>
			</Pressable>
		</BlurView>
	);
}
