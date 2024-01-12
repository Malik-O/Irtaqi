import { BottomSheetFooter } from "@gorhom/bottom-sheet";
// component
import PrimaryButton from "../../PrimaryButton";
// hook
import useCreateGroups from "../../../hook/groups/useCreateGroups";

export default function (sheetRef, props) {
	const { mutationAction, loading } = useCreateGroups(sheetRef);
	return (
		<BottomSheetFooter {...props} bottomInset={30}>
			<PrimaryButton
				mutationAction={mutationAction}
				loading={loading}
				title="createGroup"
			/>
		</BottomSheetFooter>
	);
}
