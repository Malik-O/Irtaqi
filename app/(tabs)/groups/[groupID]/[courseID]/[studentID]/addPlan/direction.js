import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../store/addPlans";
// components
import PickerWithSearch from "../../../../../../../components/PickerWithSearch";
import ScreenView from "../../../../../../../components/ScreenView";

export default function () {
	const { selectedDirections, directions } = useSelector(
		(state) => state.addPlan,
	);
	// redux
	const dispatch = useDispatch();
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["selectedDirections", val]));

	// useEffect(() => {
	// 	setSelectedItem(typeItems[0]);
	// }, []);

	return (
		<ScreenView>
			<PickerWithSearch
				items={directions}
				enableSearch
				setSelectedItem={setSelectedItem}
				selectedItem={selectedDirections}
				dialogVisible={true}
			/>
		</ScreenView>
	);
}
