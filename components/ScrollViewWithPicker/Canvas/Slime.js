import { Dimensions } from "react-native";
import {
	interpolate,
	useDerivedValue,
	Extrapolation,
} from "react-native-reanimated";
import { Path, Skia } from "@shopify/react-native-skia";
// styles
import { navigateHight } from "../styles";

const { width } = Dimensions.get("window");

export default function ({
	translateY,
	zero,
	positionXPercent,
	slimeMaxWidth,
}) {
	const positionX = width * positionXPercent - slimeMaxWidth / 2;
	const navigateSlimeShape = useDerivedValue(() => {
		const slimeWidth = interpolate(
			translateY.value,
			[navigateHight + zero, zero],
			[slimeMaxWidth, 0],
			Extrapolation.CLAMP,
		);
		const positionXMoving = positionX + (slimeMaxWidth - slimeWidth) / 2;
		const path = Skia.Path.Make();
		path.moveTo(positionXMoving, 0);
		path.lineTo(positionXMoving + slimeWidth, 0);
		path.lineTo(positionXMoving + slimeWidth, navigateHight + zero);
		path.lineTo(positionXMoving, navigateHight + zero);
		path.close();
		return path;
	}, []);
	return <Path color="#88B9F2" path={navigateSlimeShape} />;
}
