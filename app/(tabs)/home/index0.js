import React, { useEffect, useState } from "react";
import { useRouter, Link } from "expo-router";
import {
	View,
	Button,
	Text,
	Pressable,
	I18nManager,
	Alert,
	Modal,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import tw from "twrnc";
import Animated from "react-native-reanimated";
import { getLocales } from "expo-localization";
// redux
import { useSelector, useDispatch } from "react-redux";
import { langActions } from "../../../store/lang";
// hook
import connectToUserStore from "../../../hook/useConnectToStore/instants/connectToUserStore";
import connectToLangStore from "../../../hook/useConnectToStore/instants/connectToLangStore";
import useSub from "../../../hook/useSub";
import useTranslate from "../../../hook/useTranslate";
import useSetupLanguage from "../../../hook/useSetupLanguage";
import useGroups from "../../../hook/groups/useGroups";
// utils
import treeFinder from "../../../utils/treeFinder";
// components
import Card from "../../../components/Card";
import ScreenView from "../../../components/ScreenView";
import ScreenText from "../../../components/ScreenText";
// paper
import {
	Button as PaperButton,
	Dialog,
	Portal,
	PaperProvider,
	Text as PaperText,
} from "react-native-paper";

import { gql, useSubscription } from "@apollo/client";

import * as Updates from "expo-updates";

const COMMENTS_SUBSCRIPTION = gql`
	subscription Subscription {
		newUserSubscription {
			first_name
		}
	}
`;

export default function index() {
	const router = useRouter();
	const { locale } = useSelector((state) => state.lang); // select a slice
	const dispatch = useDispatch();
	// user state
	const { userData } = useSelector((state) => state.user);
	// translations hook
	const translate = useTranslate();
	const setupLanguage = useSetupLanguage();
	// get the stored user data to redux state
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
	// useEffect(() => {
	// console.log("getLocales:", getLocales()[0].languageCode, locale);
	// firstTimeLangSetting();
	// setupLanguage();
	// }, []);

	return (
		<ScreenView>
			<ScreenText>{JSON.stringify(userData)}</ScreenText>
			<ScreenText>
				{translate("name")}: {userData?.name || "null"}
			</ScreenText>
			<ScreenText>redux locale language: {locale}</ScreenText>
			<Button
				title={`change language: ${locale}`}
				onPress={(_) => setupLanguage(locale == "en" ? "ar" : "en")}
			/>
			<Button
				title="reset language settings"
				color="red"
				onPress={() => {
					langConnectionsInstance.delete();
					langConnectionsInstance.init(getLocales()[0].languageCode);
					setupLanguage(getLocales()[0].languageCode);
				}}
			/>
			{/* login condition */}
			{userData?.id ? (
				<Button
					onPress={() => UserConnectionsInstance.delete()}
					title="logout"
					color="red"
				/>
			) : (
				<Link href="/login">login</Link>
			)}
			<ScreenText>{JSON.stringify({ sub })}</ScreenText>
			{/* shortcut to student view */}
			{/* <Card
				item={{ title: "to student add plan form" }}
				href="/groups/650552241bac85c6cc903432/651438b01ffb2f1f855acff7/6514396c1ffb2f1f855acff8/addPlan"
			/> */}
			<Card
				item={{ title: "to student" }}
				href="/groups/650552241bac85c6cc903432/651438b01ffb2f1f855acff7/6514396c1ffb2f1f855acff8"
			/>
			<Card item={{ title: "open model" }} href="/home/anotherInHome" />
			<Card item={{ title: "header Test" }} href="/headerTest" />
			{/*  */}
			<Pressable onPress={() => router.push("/home/anotherInHome")}>
				<Animated.Text
					style={{ color: "white", fontSize: 40 }}
					sharedTransitionTag="sharedTag"
				>
					Shard Element
				</Animated.Text>
			</Pressable>
		</ScreenView>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "white",
		alignItems: "center",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	upper: {
		height: 100,
		backgroundColor: "#DDD",
		opacity: 0.5,
	},
});
