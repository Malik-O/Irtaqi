import { Dimensions } from "react-native";
import {
	interpolate,
	useDerivedValue,
	Extrapolation,
} from "react-native-reanimated";
import { Path, Skia } from "@shopify/react-native-skia";
// styles
import { navigateHight, MAX_BUBBLE_SHIFT } from "../styles";
import useTheme from "../../../hook/useTheme";

const { width } = Dimensions.get("window");

export default function ({
	translateY,
	zero,
	positionXPercent,
	slimeMaxWidth,
}) {
	const COLORS = useTheme();
	const positionX = width * positionXPercent - slimeMaxWidth / 2;
	const navigateSlimeShape = useDerivedValue(() => {
		const slimeWidth = interpolate(
			translateY.value,
			[-navigateHight, 0],
			[0, slimeMaxWidth],
			Extrapolation.CLAMP,
		);
		const positionXMoving = positionX + (slimeMaxWidth - slimeWidth) / 2;
		const path = Skia.Path.Make();
		path.moveTo(positionXMoving, 0);
		path.lineTo(positionXMoving + slimeWidth, 0);
		path.lineTo(positionXMoving + slimeWidth, MAX_BUBBLE_SHIFT * 2 + zero);
		path.lineTo(positionXMoving, MAX_BUBBLE_SHIFT * 2 + zero);
		path.close();
		return path;
	}, []);
	return <Path color={COLORS.primary} path={navigateSlimeShape} />;
}
