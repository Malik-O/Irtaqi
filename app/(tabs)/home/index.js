import { View, Text } from "react-native";
import ScreenView from "../../../components/ScreenView";
import CoolRefreshableView from "../../../components/CoolRefreshableView";

export default function () {
	return (
		<CoolRefreshableView onRefresh={() => {}}>
			<Text>index</Text>
		</CoolRefreshableView>
	);
}
