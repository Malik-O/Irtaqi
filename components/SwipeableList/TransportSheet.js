import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
// components
import { BottomSheetView } from "@gorhom/bottom-sheet";
import ScreenText from "../ScreenText";
import BottomSheet from "../BottomSheet";
import PrimaryButton from "../PrimaryButton";
import ListItemRipple from "../ListItemRipple";
// styles
import { paddingHorizontal } from "../../styles/layout";

function List({ list, emptyMessage, selectedItem, setSelectedItem }) {
	const action = useCallback((listItem) => {
		if (selectedItem === listItem.id) setSelectedItem(null);
		else setSelectedItem(listItem.id);
	});
	if (list?.length)
		return list.map((listItem) => (
			<View key={listItem.id}>
				<ListItemRipple
					title={listItem.title}
					checkbox
					isChecked={selectedItem === listItem.id}
					action={() => action(listItem)}
				/>
				{/* make a spread line between checkboxes */}
				{/* {i + 1 !== groups.length && <Hr opacity={0.1} />} */}
			</View>
		));
	else return <ScreenText>{emptyMessage}</ScreenText>;
}

export default function ({
	sheetRef,
	title,
	list,
	loading,
	emptyMessage,
	transportActionIterator,
}) {
	const [selectedItem, setSelectedItem] = useState();
	const snapPoints = useMemo(() => ["50%"], []);

	return (
		// <View style={styles.container}>
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			// onChange={handleSheetChange}
			defaultBackDrop
			loading={loading}
		>
			<BottomSheetView style={{ flex: 1, gap: 30, paddingHorizontal }}>
				<ScreenText variant="titleLarge">{title}</ScreenText>
				<List
					list={list}
					emptyMessage={emptyMessage}
					setSelectedItem={setSelectedItem}
					selectedItem={selectedItem}
				/>
				{selectedItem && (
					<PrimaryButton
						title="transport"
						mutationAction={async () => {
							// sheetRef.current.close();
							const selected = list.find(
								(item) => item.id === selectedItem,
							);
							await transportActionIterator.next(selected);
						}}
						color="primary"
						loading={loading}
					/>
				)}
			</BottomSheetView>
		</BottomSheet>
		// </View>
	);
}
