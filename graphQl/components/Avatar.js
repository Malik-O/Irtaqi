import { Image } from "react-native";
import React from "react";

export default function ({ scale = 1, size = 50 }) {
	return (
		<Image
			source={require("../assets/avatar.png")}
			style={{ width: size, height: size, transform: [{ scale }] }}
		/>
	);
}
