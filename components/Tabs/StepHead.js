import { useState } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// components
import { TouchableRipple } from "react-native-paper";
import ScreenText from "../ScreenText";
// styles
import { paddingHorizontal } from "../../styles/layout";

const { width } = Dimensions.get("screen");
export default function ({ activeIndex, setActiveIndex, tabs }) {
	const barWidth = width / tabs.length;
	const barStyle = useAnimatedStyle(
		() => ({
			left: withTiming(activeIndex * barWidth),
		}),
		[activeIndex],
	);
	return (
		<View style={{ width: "100%" }}>
			<View style={{ flexDirection: "row" }}>
				{tabs.map((tab, i) => (
					<View style={{ flex: 1 }} key={i}>
						<TouchableRipple
							onPress={() => {
								setActiveIndex(i);
							}}
						>
							<ScreenText
								variant="titleMedium"
								style={{
									paddingVertical: paddingHorizontal,
									textAlign: "center",
								}}
							>
								{tab.title}
							</ScreenText>
						</TouchableRipple>
					</View>
				))}
			</View>
			{/* bar */}
			<Animated.View
				style={[
					barStyle,
					{
						width: barWidth,
						height: 3,
						backgroundColor: "white",
						borderRadius: 5,
						position: "absolute",
						bottom: 0,
					},
				]}
			/>
		</View>
	);
}
