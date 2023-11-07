import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

export default function ({ title }) {
	const [text, onChangeText] = useState("Useless Text");

	return (
		<View>
			<Text style={tw`mx-4`}>{title}</Text>
			<TextInput
				value={text}
				onChangeText={onChangeText}
				style={tw`m-4 p-3 border-2 border-lime-500`}
			/>
		</View>
	);
}
