import { Link, usePathname } from "expo-router";
import Animated from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// Components
import Ionicons from "@expo/vector-icons/Ionicons";
// styles
import styles from "../styles/layout";

export default function BackButton({ style }) {
	// router stuff
	const pathname = usePathname();
	const backRout = pathname.split("/").slice(0, -2).join("/");
	// const router = useRouter();
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	console.log("backRout:", pathname, backRout);
	return (
		<Animated.View style={style}>
			<Link style={styles.navigationBackButton} href={backRout}>
				<Ionicons
					name={isRTL ? "chevron-forward" : "chevron-back"}
					size={30}
					color="white"
				/>
			</Link>
		</Animated.View>
	);
}
