import { useState } from "react";
import Animated from "react-native-reanimated";
// components
import { Menu } from "react-native-paper";
import MenuIcon from "./MenuIcon";
// hook
import useTheme from "../../../hook/useTheme";
// styles
import layoutStyles from "../../../styles/layout";

export default function ({ menu }) {
	const theme = useTheme();
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = (actionBefore) => {
		return () => {
			setVisible(false);
			actionBefore && actionBefore();
		};
	};

	return (
		<Animated.View
			style={
				[
					// layoutStyles.navigationBackButton,
					// { alignItems: "flex-end" },
				]
			}
		>
			<Menu
				visible={visible}
				onDismiss={closeMenu()}
				anchorPosition="bottom"
				anchor={<MenuIcon isExists={menu} openMenu={openMenu} />}
				contentStyle={{ backgroundColor: theme.cardColor }}
			>
				{menu?.items?.map(({ title, onPress }, i) => (
					<Menu.Item
						onPress={closeMenu(onPress)}
						title={title}
						titleStyle={{ color: theme.reverse.secondary }}
						key={i}
					/>
				))}
			</Menu>
		</Animated.View>
	);
}
