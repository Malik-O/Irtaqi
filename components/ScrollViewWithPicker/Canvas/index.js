import { Dimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { Path, Skia, Canvas, Group } from "@shopify/react-native-skia";
// styles
import styles, { navigateHight, MAX_BUBBLE_SHIFT } from "../styles";
// hook
// utils
import clamp from "../../../utils/clamp";
// component
import LiquidPaint from "./LiquidPaint";
import Slime from "./Slime";
import BubblePath from "./BubblePath/index.ios";

const { width } = Dimensions.get("window");

export default function ({ translateY, collapseOpen, inputRange, zero }) {
	// navigate shapes
	const navigateTopShape = useDerivedValue(() => {
		const path = Skia.Path.Make();
		// console.log("zero:", zero);
		path.moveTo(0, 0);
		path.lineTo(width, 0);
		path.lineTo(width, zero);
		path.lineTo(0, zero);
		path.close();
		return path;
	}, []);
	const navigateBottomShape = useDerivedValue(() => {
		const animatedZero = -clamp(translateY.value, -navigateHight, 0) + zero;
		const path = Skia.Path.Make();
		// console.log("zero:", animatedZero);
		path.moveTo(0, animatedZero);
		path.lineTo(width, animatedZero);
		path.lineTo(width, MAX_BUBBLE_SHIFT + animatedZero);
		path.lineTo(0, MAX_BUBBLE_SHIFT + animatedZero);
		path.close();
		return path;
	}, [translateY]);
	return (
		<Canvas style={[styles.bobbleSVG(zero)]}>
			<BubblePath
				translateY={translateY}
				zero={zero}
				inputRange={inputRange}
				collapseOpen={collapseOpen}
			/>
			<Group layer={LiquidPaint()}>
				{/* <Group> */}
				<Path color="#88B9F2" path={navigateTopShape} />
				<Path color="#88B9F2" path={navigateBottomShape} />
				<Slime
					translateY={translateY}
					positionXPercent={0.1}
					slimeMaxWidth={60}
					zero={zero}
				/>
				<Slime
					translateY={translateY}
					positionXPercent={0.4}
					slimeMaxWidth={30}
					zero={zero}
				/>
				{/* <Slime
					translateY={translateY}
					positionXPercent={0.5}
					slimeMaxWidth={200}
					zero={zero}
				/> */}
				<Slime
					translateY={translateY}
					positionXPercent={0.9}
					slimeMaxWidth={60}
					zero={zero}
				/>
			</Group>
		</Canvas>
	);
}
