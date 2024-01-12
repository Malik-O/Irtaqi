import { View, Text } from "react-native";
import ScreenView from "../../../components/ScreenView";
import ScreenText from "../../../components/ScreenText";
// utils
import fullName from "../../../utils/fullName";
// redux
import { useSelector } from "react-redux";

export default function index() {
	const { userData } = useSelector((state) => state.user);

	return (
		<ScreenView hasScrollView={false}>
			<ScreenText variant="headlineSmall" style={{ textAlign: "center" }}>
				Hello {fullName(userData)}
			</ScreenText>
		</ScreenView>
	);
}
