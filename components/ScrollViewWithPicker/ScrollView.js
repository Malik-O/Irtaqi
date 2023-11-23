import { View, Text, StatusBar } from "react-native";
import { useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
	runOnJS,
	useDerivedValue,
} from "react-native-reanimated";
// styles
import { navigateHight } from "./styles";
import useZero from "../../hook/useZero";

export default function ({ children, animatedStyle, translateY }) {
	const scrollRef = useRef(null);
	const isScrolling = useRef(useSharedValue(false)).current;
	const zero = useZero();
	useEffect(() => {
		setTimeout(() => {
			scrollRef.current?.scrollTo({ y: navigateHight, animated: false });
		}, 0);
	}, [scrollRef.current]);
	// const translateY = useRef(useSharedValue(zero)).current;
	const scrollHandler = (e) => {
		translateY.value = e.nativeEvent.contentOffset.y + zero;
	};
	const onScrollStop = () => {
		// const y = interpolate(
		// 	translateY.value,
		// 	[0, navigateHight],
		// 	[navigateHight, navigateHight],
		// 	Extrapolation.IDENTITY,
		// );
		"worklet";
		if (translateY.value <= navigateHight) {
			runOnJS(scrollRef.current.scrollTo)({ y: navigateHight });
		}
		// console.log("value:", scrollRef.current);
	};
	const handler = useAnimatedScrollHandler(
		{
			onScroll(e) {
				translateY.value = e.contentOffset.y + zero;
			},
			onBeginDrag: (e) => {
				isScrolling.value = true;
			},
			onEndDrag: (e) => {
				isScrolling.value = false;
				// console.log("e:", e, scrollRef.current);
				// if (scrollRef.current) {
				// runOnJS(scrollRef.current.scrollTo)({ y: navigateHight });
				// }
			},
		},
		[scrollRef],
	);
	// useDerivedValue(() => {
	// 	if (!isScrolling.value && translateY.value < navigateHight) {
	// 		scrollRef.current.scrollTo({ y: navigateHight });
	// 	}
	// }, [isScrolling]);
	return (
		<Animated.ScrollView
			ref={scrollRef}
			onScroll={handler}
			// onScrollEndDrag={onScrollStop}
			// onMomentumEnd={onScrollStop}
			// onScrollToTop={onScrollStop}
			scrollEventThrottle={6}
			style={[animatedStyle]}
		>
			{children}
		</Animated.ScrollView>
	);
}
