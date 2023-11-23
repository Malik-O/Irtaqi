import { Platform } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Animated, {
	useAnimatedStyle,
	interpolate,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// hook
import useZero from "../../hook/useZero";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../ScreenText";
import HeaderButton from "../HeaderButton";
import ExistView from "./ExistView";
import BG from "./BG";
// styles
import styles, { titlePaddingVertical } from "./styles";

export default function ({
	translateY,
	props: { title, more, back },
	titleDim,
}) {
	const { groupID } = useLocalSearchParams();
	const zero = useZero();
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// animated styles
	const titleAnimatedStyle = useAnimatedStyle(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical;
		const inputRange = [zero, titleHeight || zero];
		const extrapolations = {
			extrapolateRight: "clamp",
			extrapolateLeft: "clamp",
		};
		const interpolateCustom = (out) =>
			interpolate(translateY.value, inputRange, out, extrapolations);
		return {
			transform: [
				{ scale: interpolateCustom([1, 0.8]) },
				{
					translateX:
						interpolateCustom([
							titlePaddingVertical - titleDim.value.x || 0,
							0,
						]) *
						(-1) ** isRTL,
				},
				{ translateY: interpolateCustom([titleHeight || 0, 0]) },
			],
		};
	});
	const headerContainerAnimatedStyle = useAnimatedStyle(() => {
		const transform = [];
		const bottomSpacing =
			titleDim.value.height + titlePaddingVertical * 2 || 0;
		let paddingTop = 0;
		if (Platform.OS === "ios")
			transform.push({ translateY: translateY.value });
		else paddingTop = zero;
		return {
			paddingTop,
			paddingBottom: bottomSpacing,
			marginBottom: titlePaddingVertical * 2,
			transform,
		};
	});
	return (
		<Animated.View
			style={[styles.headerContainer, headerContainerAnimatedStyle]}
		>
			<Stack.Screen options={{ headerShown: false }} />
			<BG titleDim={titleDim} translateY={translateY} />
			<HeaderButton isExists={back} back />
			<Animated.View
				style={titleAnimatedStyle}
				onLayout={(event) =>
					(titleDim.value = event.nativeEvent.layout)
				}
			>
				<ScreenText variant="displayMedium">{title}</ScreenText>
			</Animated.View>
			<HeaderButton
				iconName="checkmark-done"
				href={`groups/${groupID}/attendance`}
				isExists={more}
				style={{ alignItems: "flex-end" }}
			/>
		</Animated.View>
	);
}
