import { View } from "react-native";
import React from "react";
// paper
import { Button as PaperButton, Dialog, Portal } from "react-native-paper";
// redux
import { useDispatch } from "react-redux";
// components
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

	function selectItemAction(val) {
		// toggle selected item
		// if selected
		if (selectedItem.indexOf(val) !== -1)
			setSelectedItem(selectedItem.filter((item) => item !== val));
		// if not selected
		else setSelectedItem([...selectedItem, val]);
	}

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
						{items.map((item, i) => (
							<ListItemRipple
								key={i}
								title={item}
								checkbox
								isChecked={selectedItem.indexOf(i) !== -1}
								action={() => selectItemAction(i)}
							/>
						))}
					</Dialog.Content>
					<Dialog.Actions>
						<PaperButton onPress={hideDialog}>Select</PaperButton>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}
