import { Paint, Blur, ColorMatrix } from "@shopify/react-native-skia";

export default function LiquidPaint() {
	return (
		<Paint>
			<Blur blur={20} />
			<ColorMatrix
				matrix={[
					1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 40,
					-10,
				]}
			/>
		</Paint>
	);
}
