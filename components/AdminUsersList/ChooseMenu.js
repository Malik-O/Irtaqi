import { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
// component
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableRipple, Menu } from "react-native-paper";
import ScreenText from "../ScreenText";
// hook
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// styles
import { paddingHorizontal } from "../../styles/layout";

export default function ({ list }) {
	const [visible, setVisible] = useState(false);

	return (
		<View
			style={{
				paddingTop: 50,
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<Menu
				visible={visible}
				onDismiss={() => setVisible(false)}
				anchor={
					<TouchableRipple onPress={() => setVisible(true)}>
						<View
							style={{
								flexDirection: "row",
								gap: 5,
								padding: paddingHorizontal,
							}}
						>
							<ScreenText style={{ color: "white" }}>
								{/* {translate(selectedRole.value)} */}
							</ScreenText>
							<Ionicons
								name="caret-down"
								color={"white"}
								size={20}
							/>
						</View>
					</TouchableRipple>
				}
			>
				{list.map((item, i) => (
					<Menu.Item onPress={() => {}} title={item} key={i} />
				))}
			</Menu>
		</View>
	);
}
