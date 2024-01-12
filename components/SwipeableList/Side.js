import { useMemo, useCallback } from "react";
import { Animated, TouchableOpacity } from "react-native";
// component
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ({
	props: [progress, dragX],
	swipeableRef,
	wide,
	icon,
	color,
	size = 26,
	action,
}) {
	const scale = progress.interpolate({
		inputRange: [0, 0.1, 0.3],
		outputRange: [0.3, 0.35, 1],
		extrapolate: "clamp",
	});
	// size
	const [width, contentWidth] = useMemo(
		() => (wide ? ["100%", "20%"] : ["20%", "100%"]),
		[],
	);
	// fire action
	const onPress = useCallback(() => {
		swipeableRef?.current && swipeableRef.current.close();
		action();
	}, []);

	return (
		<Animated.View
			style={{
				backgroundColor: color,
				width,
			}}
		>
			<TouchableOpacity onPress={onPress}>
				<Animated.View
					style={[
						// styles.actionText,
						{
							height: "100%",
							width: contentWidth,
							// backgroundColor: "cyan",
							transform: [{ scale }],
							justifyContent: "center",
							alignContent: "center",
							// alignSelf: "flex-end",
						},
					]}
				>
					<Ionicons
						name={icon}
						size={26}
						color={"white"}
						style={{ textAlign: "center" }}
					/>
				</Animated.View>
			</TouchableOpacity>
		</Animated.View>
	);
}
