import { View, TouchableOpacity } from "react-native";
// component
import ScreenText from "../ScreenText";
// styles
import { paddingHorizontal } from "../../styles/layout";
// hook
import useTheme from "../../hook/useTheme";

export default function ({ emptyMessage, emptyAction }) {
	const theme = useTheme();
	if (emptyMessage)
		return (
			<View style={{ marginTop: paddingHorizontal }}>
				<ScreenText style={{ textAlign: "center" }} variant="bodyLarge">
					{emptyMessage[0]}
				</ScreenText>
				<TouchableOpacity onPress={emptyAction}>
					<ScreenText
						style={{
							textAlign: "center",
							marginTop: 10,
							color: theme.reverse.primary,
						}}
						variant="bodyLarge"
					>
						{emptyMessage[1]}
					</ScreenText>
				</TouchableOpacity>
			</View>
		);
}
