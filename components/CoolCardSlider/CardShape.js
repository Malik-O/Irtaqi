import { useMemo, useRef } from "react";
import { View, Dimensions, Button } from "react-native";
import Animated, { useDerivedValue, runOnJS } from "react-native-reanimated";
// components
import Svg, { Defs, ClipPath, Rect, Path } from "react-native-svg";
const AnimatedPath = Animated.createAnimatedComponent(Path);
// styles
import { paddingHorizontal, HEIGHT, WIDTH, width, strokeWidth } from "./styles";
import useTheme from "../../hook/useTheme";

export default function CardShape({
	animatedProps,
	animatedPropsStroke,
	children,
	loading,
	trimValue,
}) {
	const theme = useTheme();
	const pathProgressRef = useRef(null);
	const pathLen = useMemo(() => pathProgressRef?.current?.getTotalLength());
	return (
		<View style={{ width, height: HEIGHT }}>
			<Svg style={{ zIndex: -1, position: "absolute" }}>
				<AnimatedPath
					fill={theme.cardColor}
					animatedProps={animatedProps}
					clipPath="url(#cardShape)"
				/>
				<AnimatedPath
					ref={pathProgressRef}
					style={{ transform: [{ translateY: -strokeWidth / 2 }] }}
					animatedProps={animatedPropsStroke}
					fill="transparent"
					stroke="black"
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDasharray={pathLen}
					// clipPath="url(#strokeShape)"
				/>
				{/* <Rect
					x={paddingHorizontal + strokeWidth / 2}
					y={strokeWidth / 2}
					width={WIDTH - strokeWidth}
					height={HEIGHT - strokeWidth}
					rx={radius - strokeWidth / 2}
					fill="green"
					stroke="rgba(0, 255, 255, 1)"
					strokeWidth={strokeWidth}
					strokeDasharray={borderLength}
					strokeDashoffset={0}
				/> */}
				<Defs>
					<ClipPath id="cardShape">
						<Rect
							x={paddingHorizontal}
							width={WIDTH}
							height={HEIGHT}
							rx="20"
						/>
					</ClipPath>
					<ClipPath id="strokeShape">
						<Rect
							x={paddingHorizontal}
							width={WIDTH}
							height={HEIGHT + strokeWidth}
							rx="20"
						/>
					</ClipPath>
				</Defs>
			</Svg>
			<View
				style={{
					zIndex: 10,
					width: WIDTH,
					height: "100%",
					paddingVertical: paddingHorizontal,
					paddingHorizontal,
					marginHorizontal: paddingHorizontal,
				}}
			>
				{children}
			</View>
			{/* <Button
				title="calc"
				onPress={() =>
					console.log(pathProgressRef.current.getTotalLength())
				}
			/> */}
		</View>
	);
}
