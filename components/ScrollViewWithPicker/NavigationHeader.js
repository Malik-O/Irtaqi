import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
	BounceIn,
} from "react-native-reanimated";
// styles
import styles, { navigateHight } from "./styles";
// utils
import clamp from "../../utils/clamp";
//hook
import useTheme from "../../hook/useTheme";
// Components
import Avatar from "../Avatar";
import HeaderButton from "../HeaderButton";
//
import { paddingHorizontal } from "../../styles/layout";

export default function ({ hasNavigationHeader, translateY, navigationData }) {
	const theme = useTheme();
	//
	// const selectedEntity = navigationData.filter(
	// 	(entity) => entity.selected,
	// )?.[0];
	// animated styles
	const backButtonStyle = useAnimatedStyle(() => ({
		opacity: translateY.value < 0 ? withTiming(0) : withTiming(1),
		pointerEvents: translateY.value < 0 ? "none" : "auto",
	}));
	const avatarStyle = useAnimatedStyle(() => {
		const newValue = -clamp(translateY.value, -navigateHight, 0);
		return {
			transform: [{ translateY: translateY.value < 0 ? newValue : 0 }],
		};
	});
	const nameStyle = useAnimatedStyle(() => {
		const newValue = -clamp(translateY.value, -navigateHight, 0) / 2;
		return {
			transform: [{ translateY: translateY.value < 0 ? newValue : 0 }],
		};
	});
	if (!hasNavigationHeader) return <View />;
	return (
		<Animated.View
			style={[
				styles.navigationHeader,
				{ justifyContent: "space-between" },
			]}
		>
			<HeaderButton style={backButtonStyle} back />
			<Animated.View
				style={[avatarStyle, { paddingHorizontal }]}
				entering={BounceIn.duration(700)}
			>
				<Avatar />
			</Animated.View>
			{/* <View
				style={{
					flex: 10,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 10,
					alignSelf: "flex-end",
					backgroundColor: "red",
				}}
			> */}
			{/* <Animated.Text
					style={[
						{
							fontSize: 20,
							marginHorizontal: 10,
							color: theme.reverse.secondary,
						},
						nameStyle,
					]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{selectedEntity.first_name}
				</Animated.Text> */}
			{/* </View> */}
			{/* <View style={styles.navigationBackButton} /> */}
		</Animated.View>
	);
}
