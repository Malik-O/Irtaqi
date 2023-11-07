import { useRef } from "react";
import { View, useColorScheme, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { BlurView } from "expo-blur";
import Animated, {
	useAnimatedStyle,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";
// components
import ScreenText from "../ScreenText";
import styles, {
	containerPaddingHorizontal,
	titlePaddingVertical,
} from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function ExistView({ isExists, style, children }) {
	return <View style={style}>{isExists ? children : null}</View>;
}

function Tabs({ tabs }) {
	tabs = [{ title: "قران" }, { title: "حديث" }];
	const tabItemDim = useRef(useSharedValue({})).current;
	const underlineWidthPercent = 0.6;
	const lineAnimatedStyle = useAnimatedStyle(() => ({
		top: tabItemDim.value.height || 0,
		right:
			tabItemDim.value.x +
				tabItemDim.value.width * (1 - underlineWidthPercent) || 0,
		width: tabItemDim.value.width * underlineWidthPercent,
	}));
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					// justifyContent: "space-between",
					paddingHorizontal: containerPaddingHorizontal,
				}}
			>
				{tabs?.map((tab, i) => (
					<View
						key={i}
						style={{ marginRight: containerPaddingHorizontal }}
						onLayout={(event) => {
							if (!i) {
								console.log(
									"layout:",
									event.nativeEvent.layout,
								);
								tabItemDim.value = event.nativeEvent.layout;
							}
						}}
					>
						<ScreenText variant="displayMedium">
							{tab.title}
						</ScreenText>
					</View>
				))}
			</View>
			<Animated.View
				style={[
					lineAnimatedStyle,
					{
						width: 60,
						height: 10,
						backgroundColor: "#3086D6",
						position: "absolute",
						borderRadius: 60,
					},
				]}
			/>
		</View>
	);
}

export default function ({
	translateY,
	titleDim,
	props: { title, tabs, back, more },
}) {
	const colorScheme = useColorScheme();

	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];

	const titleAnimatedStyle = useAnimatedStyle(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical;
		const inputRange = [0, titleHeight || 0];
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
						(-titleDim.value.x + titlePaddingVertical) *
							(-1) ** isRTL || 0,
						0,
					]),
				},
				{ translateY: interpolateCustom([titleHeight || 0, 0]) },
			],
		};
	});
	const headerContainerAnimatedStyle = useAnimatedStyle(() => {
		return {
			// paddingHorizontal: titlePaddingVertical,
			// paddingBottom:
			// 	titleDim.value.height + titlePaddingVertical * 2 || 0,
			transform: [{ translateY: translateY.value }],
		};
	});
	return (
		<View style={{ zIndex: 100 }}>
			<Animated.View
				style={[styles.headerContainer, headerContainerAnimatedStyle]}
			>
				<Stack.Screen options={{ headerShown: false }} />
				<BlurView
					intensity={20}
					tint={colorScheme}
					style={styles.blurView}
				/>
				<ExistView
					isExists={back}
					style={[styles.headerButtons, { alignItems: "flex-start" }]}
				>
					<Ionicons
						name={isRTL ? "chevron-forward" : "chevron-back"}
						size={30}
						color="white"
					/>
				</ExistView>
				<Animated.View
					style={titleAnimatedStyle}
					// style={{}}
					onLayout={(event) =>
						(titleDim.value = event.nativeEvent.layout)
					}
				>
					<ScreenText
						variant="headlineLarge"
						style={{ transform: [{ translateX: 15 }] }}
					>
						{title}
					</ScreenText>
					{/* <TouchableOpacity onPress={() => {}}>
						<ScreenText
							variant="headlineSmall"
							style={{
								textAlign: "right",
								transform: [{ translateX: -15 }],
								color: "#3086D6",
							}}
						>
							{tabs[0].title}
						</ScreenText>
					</TouchableOpacity> */}
				</Animated.View>
				<ExistView isExists={more} style={styles.headerButtons}>
					<Ionicons name="settings-outline" size={30} color="white" />
				</ExistView>
			</Animated.View>
			{/* <Tabs tabs={tabs}></Tabs> */}
		</View>
	);
}
