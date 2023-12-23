import { useState, useRef } from "react";
import { View, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { Stack } from "expo-router";
import {
	useSharedValue,
	useDerivedValue,
	runOnJS,
	withTiming,
} from "react-native-reanimated";
// hook
import useTheme from "../../hook/useTheme";
import useZero from "../../hook/useZero";
// components
import GlobalDatePicker from "../GlobalDatePicker";
import ScreenView from "../ScreenView";
import Collapse from "../icons/Collapse";
import HeaderButton from "../HeaderButton";
//
import { paddingHorizontal } from "../../styles/layout";

const { height } = Dimensions.get("screen");

export default function ({ children }) {
	const theme = useTheme();
	const zero = useZero();
	const scrollViewRef = useRef(null);
	const collapseOpen = useSharedValue(0);
	// is scrollable
	const [hasScrollView, setHasScrollView] = useState(false);
	useDerivedValue(() => {
		runOnJS(setHasScrollView)(!collapseOpen.value);
	}, [collapseOpen]);
	// change calendar status
	function onStatusChanges(value) {
		// collapse calendar
		collapseOpen.value = withTiming(value ?? +!collapseOpen.value);
		// scroll to top
		scrollViewRef?.current && scrollViewRef.current.scrollTo({ y: 0 });
	}

	return (
		<ScreenView
			paddingTop={false}
			scrollEnabled={hasScrollView}
			scrollViewRef={scrollViewRef}
		>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: theme.primary },
					headerBackground: () => null,
					// gestureEnabled: true,
					headerShown: true,
					headerTitleStyle: { color: theme.reverse.secondary },
					headerLeft: () => <HeaderButton isExists={true} back />,
					headerRight: () => (
						<TouchableOpacity onPress={() => onStatusChanges()}>
							<View
								style={{
									// width: 100,
									transform: [{ scale: 1.3 }],
									padding: 8,
									justifyContent: "flex-end",
									paddingHorizontal,
									flexDirection: "row",
								}}
							>
								{/* <Collapse /> */}
								<Collapse />
							</View>
						</TouchableOpacity>
					),
				}}
			/>
			<View
				style={{
					backgroundColor: theme.primary,
					paddingTop: zero,
					paddingBottom: 20,
				}}
			>
				<View>
					<GlobalDatePicker
						collapseOpen={collapseOpen}
						onStatusChanges={onStatusChanges}
					/>
				</View>
			</View>
			{children}
			<View
				style={{
					height: height / 2,
					width: 500,
					// backgroundColor: "red",
				}}
			/>
		</ScreenView>
	);
}
