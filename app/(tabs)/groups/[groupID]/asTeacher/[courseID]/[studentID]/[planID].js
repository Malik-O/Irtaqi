import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";
// hook
import useWhichInstanceIsToday from "../../../../../../../hook/plans/useWhichInstanceIsToday";
import usePlanInstanceString from "../../../../../../../hook/plans/usePlanInstanceString";

export default function () {
	const { planID } = useGlobalSearchParams();
	const getPlanCardString = usePlanInstanceString();
	const plans = useWhichInstanceIsToday();
	const currPlan = plans.find((plan) => plan.id === planID);
	return (
		<View>
			{currPlan.Plans_instances?.map((instance, i) => (
				<Text variant="bodyMedium" key={i}>
					{new Intl.DateTimeFormat("en-GB").format(
						new Date(+instance.date),
					)}
					{getPlanCardString({
						...currPlan,
						day: [instance],
					})}
				</Text>
			))}
		</View>
	);
}
