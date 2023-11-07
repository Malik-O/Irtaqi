import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../store/addPlans";
// components
import PickerWithSearch from "../../../../../../../components/PickerWithSearch";
import ScreenView from "../../../../../../../components/ScreenView";
import ListItemRipple from "../../../../../../../components/ListItemRipple";

const items = [
	"saturday",
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
];

export default function () {
	const { selectedDays } = useSelector((state) => state.addPlan);
	// redux
	const dispatch = useDispatch();
	// select item
	const setSelectedItem = (val) =>
		dispatch(addPlanActions.setState(["selectedDays", val]));
	// useEffect(() => {
	// 	setSelectedItem(typeItems[0]);
	// }, []);

	function selectItemAction(val) {
		// toggle selected item
		// if selected
		if (selectedDays.indexOf(val) !== -1)
			setSelectedItem(selectedDays.filter((item) => item !== val));
		// if not selected
		else setSelectedItem([...selectedDays, val]);
	}

	return (
		<ScreenView>
			{items.map((item, i) => (
				<ListItemRipple
					key={i}
					title={item}
					checkbox
					isChecked={selectedDays.indexOf(i) !== -1}
					action={() => selectItemAction(i)}
				/>
			))}
		</ScreenView>
	);
}
