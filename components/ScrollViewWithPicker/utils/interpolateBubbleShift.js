import { interpolate } from "react-native-reanimated";
import { MAX_BUBBLE_SHIFT } from "../styles";

export default function (pathHeight, inputRange) {
	"worklet";
	return interpolate(pathHeight, inputRange, [0, MAX_BUBBLE_SHIFT]);
}
