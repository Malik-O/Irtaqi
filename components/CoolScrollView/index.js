import { useRef, useState } from "react";
import { Platform, Dimensions, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
import { titlePaddingVertical, containerPaddingHorizontal } from "./styles";
// components
import AnimatedHeader from "./AnimatedHeader";
// hooks
import useZero from "../../hook/useZero";

const { height, width } = Dimensions.get("screen");
export default function ({
	children,
	props,
	onScrollEvent,
	paddingTop = true,
	onRefresh,
}) {
	const [refreshing, setRefreshing] = useState(false);
	const zero = paddingTop ? useZero() : 0;
	const insets = useSafeAreaInsets();
	const translateY = useRef(useSharedValue(zero)).current;
	const titleDim = useRef(useSharedValue({})).current;
	// update translateY on scroll
	function onScroll(e) {
		translateY.value = e.nativeEvent.contentOffset.y + zero;
		// console.log(
		// 	"e.nativeEvent.contentOffset.y:",
		// 	e.nativeEvent.contentOffset.y,
		// );
		onScrollEvent && onScrollEvent(e.nativeEvent.contentOffset.y);
	}
	function onScrollStop(e) {
		const titleHight = titleDim.value.height + titlePaddingVertical * 2;
		// step on between animation
		let val = 0;
		if (translateY.value - zero > titleHight) return;
		if (translateY.value - zero >= titleHight / 2) {
			val = titleHight;
		}
		e.target.scrollTo({ y: val });
		translateY.value = withTiming(val);
	}
	const scrollViewStyle = useAnimatedStyle(() => ({
		paddingTop:
			zero + titleDim.value.height + titlePaddingVertical * 3 || zero,
	}));
	// return Platform dependent
	if (Platform.OS === "ios")
		return (
			<Animated.ScrollView
				onScroll={onScroll}
				onScrollEndDrag={onScrollStop}
				onMomentumEnd={onScrollStop}
				scrollEventThrottle={16}
				refreshControl={
					onRefresh ? (
						<RefreshControl
							refreshing={refreshing}
							progressViewOffset={-30}
							onRefresh={async () => {
								setRefreshing(true);
								onRefresh();
								setRefreshing(false);
							}}
						/>
					) : null
				}
				style={{ paddingTop: insets.top }}
			>
				<AnimatedHeader
					zero={zero}
					props={props}
					translateY={translateY}
					titleDim={titleDim}
				/>
				{children}
				<View style={{ height: height / 2, width: "100%" }} />
			</Animated.ScrollView>
		);
	else
		return (
			<>
				<AnimatedHeader
					zero={zero}
					props={props}
					translateY={translateY}
					titleDim={titleDim}
				/>
				<Animated.ScrollView
					onScroll={onScroll}
					onScrollEndDrag={onScrollStop}
					onMomentumEnd={onScrollStop}
					scrollEventThrottle={16}
					style={scrollViewStyle}
				>
					{children}
					<View style={{ height: height / 2, width: "100%" }} />
				</Animated.ScrollView>
			</>
		);
}
