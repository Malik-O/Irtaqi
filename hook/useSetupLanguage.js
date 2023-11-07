import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
// redux
import { useSelector, useDispatch } from "react-redux";
import { langActions } from "../store/lang";
import connectToLangStore from "./useConnectToStore/instants/connectToLangStore";

function changeRTL(shouldBeRTL) {
	// if already RTL
	if (I18nManager.isRTL === shouldBeRTL) return;
	I18nManager.allowRTL(shouldBeRTL);
	I18nManager.forceRTL(shouldBeRTL);
	Updates.reloadAsync();
}

export default function () {
	const langConnectionsInstance = connectToLangStore();
	const { locale, rtl } = useSelector((state) => state.lang);
	const dispatch = useDispatch();
	return (lang = locale) => {
		const shouldBeRTL = rtl[lang];
		// if same language do not change
		// if (locale === lang) return;
		// change language in redux
		langConnectionsInstance.init(lang);
		// force update
		changeRTL(shouldBeRTL);
	};
}
