import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../../store/addPlan";
// components
import PickerWithSearch from "../../../../../../../../components/PickerWithSearch";
import ScreenView from "../../../../../../../../components/ScreenView";

export default function () {
	const { selectedSurah } = useSelector((state) => state.addPlan);
	const { surahNames } = useSelector((state) => state.quran);
	// redux
	const dispatch = useDispatch();
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["selectedSurah", val]));

	return (
		<ScreenView>
			<PickerWithSearch
				items={surahNames}
				enableSearch
				setSelectedItem={setSelectedItem}
				selectedItem={selectedSurah}
				dialogVisible={true}
			/>
		</ScreenView>
	);
}
