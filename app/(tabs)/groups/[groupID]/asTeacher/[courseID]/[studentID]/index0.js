import { View, Text } from "react-native";
import { useState } from "react";
// components
import ScrollViewWithPicker from "../../../../../../../components/ScrollViewWithPicker";
import CoolCardSlider from "../../../../../../../components/CoolCardSlider";

const list = ["one", "two", "three", "four", "five", "six"];

export default function index() {
	// const waitForList = useState([]);
	const selectedNumberState = useState(0);
	function onSlide(newVal) {
		// console.log({ newVal, selectedNumber: selectedNumberState[0] });
	}
	return (
		<ScrollViewWithPicker>
			<CoolCardSlider
				selectedNumberState={selectedNumberState}
				onSlide={onSlide}
				list={list}
			>
				<Text style={{ fontSize: 30, color: "white", zIndex: 10 }}>
					{selectedNumberState[0]}
				</Text>
			</CoolCardSlider>
		</ScrollViewWithPicker>
	);
}
