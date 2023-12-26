import "../wdyr";
import { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { getLocales } from "expo-localization";
// redux
import { useSelector, useDispatch } from "react-redux";
// hook
import connectToUserStore from "../hook/useConnectToStore/instants/connectToUserStore";
import connectToLangStore from "../hook/useConnectToStore/instants/connectToLangStore";
import useSub from "../hook/useSub";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function index() {
	// user state
	const { userData } = useSelector((state) => state.user);
	// get
	const UserConnectionsInstance = connectToUserStore();
	const langConnectionsInstance = connectToLangStore();
	const sub = useSub();
	function firstTimeLangSetting() {
		if (locale) return;
		langConnectionsInstance.init(getLocales()[0].languageCode);
		setupLanguage(getLocales()[0].languageCode);
	}
	useEffect(() => {
		UserConnectionsInstance.get();
		langConnectionsInstance.get();
	}, []);
	// fonts
	const [fontsLoaded, error] = useFonts({
		Quicksand: require("../assets/fonts/Quicksand-VariableFont_wght.ttf"),
	}); // Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);
	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) return null;
	if (!userData?.id) return <Redirect href="/login" />;
	return <Redirect href="/home" />;
}
