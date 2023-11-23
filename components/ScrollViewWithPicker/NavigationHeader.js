import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// styles
import styles, { navigateHight } from "./styles";
// utils
import clamp from "../../utils/clamp";
// Components
import Avatar from "../Avatar";
import HeaderButton from "../HeaderButton";

export default function ({ hasNavigationHeader, translateY, navigationData }) {
	if (!hasNavigationHeader) return <View />;
	//
	const selectedEntity = navigationData.filter(
		(entity) => entity.selected,
	)?.[0];
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
	return (
		<Animated.View style={[styles.navigationHeader]}>
			<HeaderButton style={backButtonStyle} back />
			<View
				style={{
					flex: 10,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 10,
				}}
			>
				<Animated.View style={avatarStyle}>
					<Avatar />
				</Animated.View>
				<Animated.Text
					style={[{ fontSize: 20, marginHorizontal: 10 }, nameStyle]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{selectedEntity.first_name}
				</Animated.Text>
			</View>
			<View style={styles.navigationBackButton} />
		</Animated.View>
	);
}
