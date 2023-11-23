import Animated from "react-native-reanimated";

export default function ExistView({ isExists, style, titleHeight, children }) {
	return (
		<Animated.View style={style}>
			{isExists ? children : null}
		</Animated.View>
	);
}
