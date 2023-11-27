import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
// paper
import {
	TouchableRipple,
	Button as PaperButton,
	Dialog,
	Portal,
	PaperProvider,
	Text as PaperText,
	TextInput,
} from "react-native-paper";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../store/addPlan";
// components
import PickerWithSearch from "./PickerWithSearch";
import ScreenText from "./ScreenText";
import ListItemRipple from "./ListItemRipple";

export default function ({
	title,
	items,
	selected: [selectedItem, setSelectedItemObj],
	visible: [dialogVisible, setDialogVisibleObj],
	storeAction,
	enableSearch,
}) {
	// dialog visible
	const showDialog = () =>
		dispatch(storeAction.setState([setDialogVisibleObj, true]));
	const hideDialog = () =>
		dispatch(storeAction.setState([setDialogVisibleObj, false]));
	// select item
	const setSelectedItem = (val) =>
		dispatch(storeAction.setState([setSelectedItemObj, val]));
	// redux
	const dispatch = useDispatch();

	useEffect(() => {
		setSelectedItem(items[0]);
	}, []);

	return (
		<View>
			<ListItemRipple
				action={showDialog}
				title={title}
				selectedItem={selectedItem}
			/>
			<Portal>
				<Dialog visible={dialogVisible} onDismiss={hideDialog}>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Content>
						<PickerWithSearch
							items={items}
							enableSearch={enableSearch}
							setSelectedItem={setSelectedItem}
							selectedItem={selectedItem}
							dialogVisible={dialogVisible}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<PaperButton onPress={hideDialog}>Select</PaperButton>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}
