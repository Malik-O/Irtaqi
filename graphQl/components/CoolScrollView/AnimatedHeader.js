import { Platform, View, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { BlurView } from "expo-blur";
import Animated, {
	useAnimatedStyle,
	interpolate,
	useAnimatedProps,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// components
import ScreenText from "../ScreenText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles, { titlePaddingVertical, iconSize } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// const titlePaddingVertical = 20;
// const containerPaddingHorizontal = 20;

// paddingTop: iconSize/2,

function ExistView({ isExists, style, titleHeight, children }) {
	return (
		<Animated.View style={style}>
			{isExists ? children : null}
		</Animated.View>
	);
}
function BG({ titleDim, translateY }) {
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	const bgStyle = useAnimatedStyle(() => {
		const transform = [];
		if (Platform.OS === "ios")
			transform.push({ translateY: -titleDim.value.height || 0 });
		return {
			transform,
			height: titleDim.value.height + zero + titlePaddingVertical || 0,
		};
	});
	const intensity = useAnimatedProps(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical * 2;
		const inputRange = [zero, titleHeight || zero];
		const extrapolations = {
			extrapolateRight: "clamp",
			extrapolateLeft: "clamp",
		};
		const interpolateCustom = (out) =>
			interpolate(translateY.value, inputRange, out, extrapolations);
		return { intensity: interpolateCustom([0, 100]) };
	});
	if (Platform.OS === "ios")
		return (
			<AnimatedBlurView
				animatedProps={intensity}
				// intensity={100}
				tint="dark"
				style={[styles.blurView, bgStyle]}
			/>
		);
	else
		return (
			<Animated.View
				style={[styles.blurView, { backgroundColor: "red" }, bgStyle]}
			/>
		);
}

export default function ({
	translateY,
	props: { title, more, back },
	titleDim,
}) {
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// safe area spacing
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;

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
					translateX: interpolateCustom([
						-titleDim.value.x + titlePaddingVertical || 0,
						0,
					]),
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
			<ExistView
				titleHeight={titleDim.value.height}
				isExists={back}
				style={[styles.headerButtons, { alignItems: "flex-start" }]}
			>
				<Ionicons
					name={isRTL ? "chevron-forward" : "chevron-back"}
					size={30}
					color="white"
					style={{ marginTop: 10 }}
				/>
			</ExistView>
			<Animated.View
				style={titleAnimatedStyle}
				onLayout={(event) =>
					(titleDim.value = event.nativeEvent.layout)
				}
			>
				<ScreenText variant="displayMedium">{title}</ScreenText>
			</Animated.View>
			<ExistView
				isExists={more}
				style={[styles.headerButtons, { alignItems: "flex-end" }]}
			>
				<Ionicons
					name="settings-outline"
					size={30}
					color="white"
					style={{ marginTop: 10 }}
				/>
			</ExistView>
		</Animated.View>
	);
}
