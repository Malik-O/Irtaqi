import { Path, Canvas } from "@shopify/react-native-skia";

const pathSize = 17;

export default function ({ size, color, paths }) {
	return (
		<Canvas
			style={{
				width: pathSize,
				height: pathSize,
				transform: [{ scale: 1.5 }],
				// backgroundColor: "red",
			}}
		>
			{paths.map((path, i) => (
				<Path color={color} path={path} key={i} />
			))}
		</Canvas>
	);
}
