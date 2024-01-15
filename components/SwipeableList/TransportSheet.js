import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
// components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ScreenText from "../ScreenText";
import BottomSheet from "../BottomSheet";
import PrimaryButton from "../PrimaryButton";
import ListItemRipple from "../ListItemRipple";
// styles
import { paddingHorizontal } from "../../styles/layout";

function List({ title, list, emptyMessage, selectedItem, setSelectedItem }) {
	const action = useCallback((listItem) => {
		if (selectedItem === listItem.id) setSelectedItem(null);
		else setSelectedItem(listItem.id);
	});
	if (list?.length)
		return (
			<View style={{ gap: paddingHorizontal }}>
				<ScreenText variant="titleLarge">{title}</ScreenText>
				<View style={{ paddingHorizontal }}>
					{list.map((listItem, i) => (
						<View key={listItem.id}>
							<ListItemRipple
								title={listItem.title}
								checkbox
								isChecked={selectedItem === listItem.id}
								action={() => action(listItem)}
								style={{ paddingVertical: paddingHorizontal }}
							/>
							{/* make a spread line between checkboxes */}
							{/* {i + 1 !== groups.length && <Hr opacity={0.1} />} */}
						</View>
					))}
				</View>
			</View>
		);
	else return <ScreenText>{emptyMessage}</ScreenText>;
}

export default function ({
	sheetRef,
	title,
	list,
	loading,
	emptyMessage,
	transportActionIterator,
	transportRoles,
	transportTitle,
}) {
	const [selectedGroup, setSelectedGroup] = useState();
	const [selectedRole, setSelectedRole] = useState();
	const snapPoints = useMemo(() => ["70%"], []);
	//
	const submitActive =
		selectedGroup &&
		(!transportRoles?.length || (transportRoles?.length && selectedRole));
	return (
		// <View style={styles.container}>
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			// onChange={handleSheetChange}
			defaultBackDrop
			loading={loading}
		>
			<BottomSheetScrollView
				contentContainerStyle={{ flex: 1, gap: 30, paddingHorizontal }}
			>
				<List
					title={title}
					list={list}
					emptyMessage={emptyMessage}
					setSelectedItem={setSelectedGroup}
					selectedItem={selectedGroup}
				/>
				<List
					title={transportTitle}
					list={transportRoles}
					setSelectedItem={setSelectedRole}
					selectedItem={selectedRole}
				/>
				{submitActive && (
					<PrimaryButton
						title="transport"
						mutationAction={async () => {
							// sheetRef.current.close();
							const group = list.find(
								(item) => item.id === selectedGroup,
							);
							const role =
								transportRoles &&
								transportRoles.find(
									(item) => item.id === selectedRole,
								);
							console.log({ transportRoles, role, selectedRole });
							await transportActionIterator.next({
								selectedRole: role,
								selectedGroup: group,
							});
						}}
						color="primary"
						loading={loading}
					/>
				)}
			</BottomSheetScrollView>
		</BottomSheet>
		// </View>
	);
}
