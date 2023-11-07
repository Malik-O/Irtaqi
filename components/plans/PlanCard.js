import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import React from "react";
import { Card } from "react-native-paper";
// redux
import { useSelector } from "react-redux";
// hook
import useTranslate from "../../hook/useTranslate";
import usePlanInstanceString from "../../hook/usePlanInstanceString";
// components
import {
	Button,
	Dialog,
	Portal,
	PaperProvider,
	Text,
} from "react-native-paper";
import ScreenText from "../ScreenText";

const config = { duration: 200 };
export default function ({ plan }) {
	const translate = useTranslate();
	const getPlanCardString = usePlanInstanceString();
	const isPressIn = useSharedValue(false);
	const largeCard = useSharedValue(false);

	const cardStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: isPressIn.value ? withSpring(0.9) : withSpring(1),
			},
		],
	}));

	const [visible, setVisible] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	return (
		<View>
			<TouchableWithoutFeedback
				onPressIn={() => {
					isPressIn.value = true;
				}}
				onPressOut={() => {
					isPressIn.value = false;
				}}
				onPress={() => {
					setVisible(true);
				}}
			>
				<Animated.View style={[styles.planCardContainer, cardStyle]}>
					<ScreenText variant="bodyLarge">
						{translate(plan.title)}
					</ScreenText>
					<ScreenText>{getPlanCardString(plan)}</ScreenText>
				</Animated.View>
			</TouchableWithoutFeedback>

			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideDialog}
					style={{ backgroundColor: "#009688" }}
				>
					<Dialog.Title>{translate(plan.title)}</Dialog.Title>
					<Dialog.Content>
						{plan.Plans_instances?.map((instance) => (
							<Text variant="bodyMedium" key={instance.id}>
								{new Intl.DateTimeFormat("en-GB").format(
									new Date(+instance.date),
								)}
								{getPlanCardString({
									...plan,
									day: [instance],
								})}
							</Text>
						))}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>
							{translate("close")}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	planCardContainer: {
		width: 200,
		margin: 20,
		backgroundColor: "#009688",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
	},
});
