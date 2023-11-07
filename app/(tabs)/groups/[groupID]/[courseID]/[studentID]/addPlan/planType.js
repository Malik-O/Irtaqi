import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../store/addPlans";
// components
import PickerWithSearch from "../../../../../../../components/PickerWithSearch";
import ScreenView from "../../../../../../../components/ScreenView";

export default function () {
	const { typeSelected, typeItems } = useSelector((state) => state.addPlan);
	// redux
	const dispatch = useDispatch();
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["typeSelected", val]));

	// useEffect(() => {
	// 	setSelectedItem(typeItems[0]);
	// }, []);

	return (
		<ScreenView>
			<PickerWithSearch
				items={typeItems}
				setSelectedItem={setSelectedItem}
				selectedItem={typeSelected}
				dialogVisible={true}
			/>
		</ScreenView>
	);
}
