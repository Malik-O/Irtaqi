import { TouchableOpacity, View } from "react-native";
// components
import MenuIconSVG from "../../icons/Menu";

export default function ({ isExists, openMenu }) {
	if (!isExists) return;
	return (
		<TouchableOpacity onPress={openMenu}>
			<View>
				<MenuIconSVG />
			</View>
		</TouchableOpacity>
	);
}
