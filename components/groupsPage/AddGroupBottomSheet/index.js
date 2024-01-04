import { useCallback, useMemo } from "react";
// redux
import { useSelector } from "react-redux";
import { groupsActions } from "../../../store/groups";
// components
import { BottomSheetView, useBottomSheetInternal } from "@gorhom/bottom-sheet";
import Footer from "./Footer";
import BottomSheet from "../../BottomSheet";
import DismissKeyboard from "../../DismissKeyboard";
import Felids from "./Felids";
// hook
import useAddUserValidate from "../../../hook/useAddUserValidate";
import useTranslate from "../../../hook/useTranslate";
//

// create a view component with dismiss hook
const DismissKeyboardView = DismissKeyboard();

export default function ({ sheetRef }) {
	const translate = useTranslate();
	// callbacks
	const snapPoints = useMemo(() => ["50%", "90%"], []);
	const handleSheetChange = useCallback((index) => {
		// console.log("handleSheetChange", index);
	}, []);
	// redux
	const { addGroupFormData } = useSelector((state) => state.groups);
	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			enableDismissOnClose
			footerComponent={(props) => Footer(sheetRef, props)}
		>
			<Felids sheetRef={sheetRef} />
		</BottomSheet>
	);
}
