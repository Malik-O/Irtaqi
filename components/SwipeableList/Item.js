import { useRef, useCallback } from "react";
import { View } from "react-native";
// component
import { TouchableRipple } from "react-native-paper";
import Reanimated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ScreenText from "../ScreenText";
import Avatar from "../Avatar";
import Side from "./Side";
// redux
import { useSelector } from "react-redux";
// styles
import { paddingHorizontal } from "../../styles/layout";
// utils
import fullName from "../../utils/fullName";
// hook
import useTheme from "../../hook/useTheme";

function LeftActions({ props, swipeableRef, transportAction, editAction }) {
	const theme = useTheme();
	return (
		<>
			{transportAction && (
				<Side
					props={props}
					swipeableRef={swipeableRef}
					icon="arrow-redo-outline"
					color={theme.primary}
					action={transportAction}
				/>
			)}
			{editAction && (
				<Side
					props={props}
					swipeableRef={swipeableRef}
					icon="pencil-outline"
					color={theme.warning}
					action={editAction}
				/>
			)}
		</>
	);
}
function RightActions({ props, removeActionIterator }) {
	const theme = useTheme();
	if (removeActionIterator)
		return (
			<Side props={props} wide icon="trash-outline" color={theme.error} />
		);
}

export default function ({
	item,
	onPress,
	hasAvatar = false,
	hasConfirmation,
	// action
	removeActionIterator,
	editAction,
	transportActionIterator,
}) {
	const theme = useTheme();
	const swipeableRef = useRef(null);
	// remove action animation
	const isRemoved = useSharedValue(false);
	// action
	const runIterator = useCallback((actionIterator, isRemoved, ref) => {
		return () => {
			const iter = actionIterator();
			iter.next();
			iter.next({ isRemoved, item });
			if (hasConfirmation && ref) ref.close();
		};
	}, []);
	// swipe to remove
	const onSwipeableOpen = useCallback(
		(sideName, ref) => {
			if (sideName === "right" && removeActionIterator) {
				runIterator(removeActionIterator, isRemoved, ref)();
			}
		},
		[removeActionIterator],
	);
	// style
	const swipeableStyle = useAnimatedStyle(
		() => ({
			height: isRemoved.value
				? withTiming(0)
				: withTiming(hasAvatar ? 100 : 70),
			paddingVertical: isRemoved.value
				? withTiming(0)
				: withTiming(paddingHorizontal),
		}),
		[isRemoved],
	);

	return (
		<Swipeable
			ref={swipeableRef}
			renderLeftActions={(...props) => (
				<LeftActions
					props={props}
					swipeableRef={swipeableRef}
					editAction={editAction}
					transportAction={
						transportActionIterator &&
						runIterator(transportActionIterator)
					}
				/>
			)}
			renderRightActions={(...props) => (
				<RightActions
					props={props}
					removeActionIterator={removeActionIterator}
				/>
			)}
			overshootLeft={false}
			// dragOffsetFromLeftEdge={30}
			// renderRightActions={Side}
			onSwipeableOpen={onSwipeableOpen}
		>
			<TouchableRipple onPress={() => onPress(item)} disabled={!onPress}>
				<Reanimated.View
					style={[
						swipeableStyle,
						{
							padding: paddingHorizontal,
							backgroundColor: theme.tertiary,
							justifyContent: "space-between",
							borderRadius: 10,
						},
					]}
				>
					<View
						style={{
							flexDirection: "row",
							gap: 20,
							alignItems: "center",
						}}
					>
						{hasAvatar && <Avatar />}
						<View style={{ alignItems: "center" }}>
							<ScreenText
								variant="titleMedium"
								textOverflow
								style={{ fontWeight: "bold" }}
							>
								{item?.title || fullName(item)}
							</ScreenText>
							{item?.description && (
								<ScreenText textOverflow>
									{item?.description}
								</ScreenText>
							)}
						</View>
					</View>
				</Reanimated.View>
			</TouchableRipple>
		</Swipeable>
	);
}
