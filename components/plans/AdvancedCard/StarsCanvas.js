// hook
import useStars from "../../../hook/useStars";
// components
import { Path, Canvas } from "@shopify/react-native-skia";

export default function () {
	const { containerDim, stars } = useStars();
	return (
		<Canvas
			style={{
				position: "absolute",
				...containerDim(),
			}}
		>
			{stars.map((star, i) => (
				<Path path={star} color="gray" key={i} />
			))}
		</Canvas>
	);
}
