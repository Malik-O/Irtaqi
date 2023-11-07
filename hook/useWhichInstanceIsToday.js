import { useState, useEffect } from "react";
// utils
import extractISODate from "../utils/extractISODate";
// redux
import { useSelector, useDispatch } from "react-redux";
import { plansActions } from "../store/plans";

// get this day plans
function addPlanOfTheDay(plans, selectedDate) {
	return (
		plans
			// .filter((plan) => !plan.hide)
			.map((plan) => {
				let pClone = { ...plan };
				pClone.day = plan.Plans_instances?.filter((day) => {
					return (
						extractISODate({ date: day.date }) ==
						extractISODate({ date: selectedDate })
					);
				});
				return pClone;
			})
	);
}

export default function () {
	// const dispatch = useDispatch();
	const { plans } = useSelector((state) => state.plans);
	const [allPlans, setAllPlans] = useState([...plans]);
	const { globalDate } = useSelector((state) => state.globalDate);
	// update the plans when changing
	useEffect(() => {
		const afterAddingDay = addPlanOfTheDay(plans, globalDate);
		// dispatch(plansActions.initPlans(afterAddingDay));
		setAllPlans(afterAddingDay);
	}, [globalDate, plans]);
	return allPlans;
}
