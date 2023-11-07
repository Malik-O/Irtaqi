import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function () {
	return (
		<View>
			<Link href="/another">Another page</Link>
		</View>
	);
}
