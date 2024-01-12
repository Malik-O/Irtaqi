import { useMemo } from "react";
// components
import { BottomSheetView } from "@gorhom/bottom-sheet";
import ScreenText from "../ScreenText";
import BottomSheet from "../BottomSheet";
import PrimaryButton from "../PrimaryButton";
// styles
import { paddingHorizontal } from "../../styles/layout";

export default function ({
	sheetRef,
	itemRemovable,
	generateConfirmMessage,
	removeActionIterator,
	loading,
}) {
	const snapPoints = useMemo(() => ["30%"], []);
	// handle change sheet
	// const handleSheetChange = useCallback((index) => {
	// 	if (index === -1 && swipeableRemovableRef.current) {
	// 		swipeableRemovableRef.current.close();
	// 	}
	// }, []);
	return (
		// <View style={styles.container}>
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			// onChange={handleSheetChange}
			defaultBackDrop
			bottomInset={46}
			detached
			style={{ marginHorizontal: paddingHorizontal }}
			// loading={loading}
		>
			<BottomSheetView style={{ flex: 1, gap: 30, paddingHorizontal }}>
				<ScreenText>{generateConfirmMessage(itemRemovable)}</ScreenText>
				<PrimaryButton
					title="remove"
					mutationAction={async () => {
						sheetRef.current.close();
						await removeActionIterator.next();
					}}
					color="error"
					// loading={loading}
				/>
			</BottomSheetView>
		</BottomSheet>
		// </View>
	);
}
