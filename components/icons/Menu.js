import Svg, { Circle } from "react-native-svg";
import useTheme from "../../hook/useTheme";

export default function ({ fill }) {
	const theme = useTheme();
	fill ||= theme.reverse.secondary;
	return (
		<Svg width="28" height="28">
			<Circle cx="14" cy="14" r="13.5" stroke={fill} fill="transparent" />
			<Circle cx="7.61277" cy="13.6128" r="1.61277" fill={fill} />
			<Circle cx="14.0639" cy="13.6128" r="1.61277" fill={fill} />
			<Circle cx="20.5146" cy="13.6128" r="1.61277" fill={fill} />
		</Svg>
	);
}
