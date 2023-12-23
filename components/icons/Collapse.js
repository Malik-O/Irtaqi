import Svg, { Path } from "react-native-svg";
import useTheme from "../../hook/useTheme";

export default function ({ fill }) {
	const theme = useTheme();
	fill ||= theme.reverse.secondary;
	return (
		<Svg width="16" height="17">
			<Path
				fill={fill}
				d="M2 0H14C15.1046 0 16 0.89543 16 2V5C16 6.10457 15.1046 7 14 7H2C0.89543 7 0 6.10457 0 5V2C0 0.89543 0.89543 0 2 0ZM14 5.5C14.2761 5.5 14.5 5.27614 14.5 5V2C14.5 1.72386 14.2761 1.5 14 1.5H2C1.72386 1.5 1.5 1.72386 1.5 2V5C1.5 5.27614 1.72386 5.5 2 5.5H14Z"
			/>
			<Path
				fill={fill}
				d="M2 10H14C15.1046 10 16 10.8954 16 12V15C16 16.1046 15.1046 17 14 17H2C0.89543 17 0 16.1046 0 15V12C0 10.8954 0.89543 10 2 10ZM14 15.5C14.2761 15.5 14.5 15.2761 14.5 15V12C14.5 11.7239 14.2761 11.5 14 11.5H2C1.72386 11.5 1.5 11.7239 1.5 12V15C1.5 15.2761 1.72386 15.5 2 15.5H14Z"
			/>
		</Svg>
	);
}
