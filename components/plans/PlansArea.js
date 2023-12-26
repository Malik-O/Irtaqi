import { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// components
import { Text } from "react-native-paper";
import PlanCard from "../../components/plans/PlanCard";
// hooks
import usePlans from "../../hook/plans/usePlans";
import useTranslate from "../../hook/useTranslate";

export default function ({ plans, openSheet }) {
	const translate = useTranslate();
	// get the plans
	const { isLoading } = usePlans();
	// render the plans
	// return <Text>{JSON.stringify(isLoading)}</Text>;
	if (isLoading) return <ActivityIndicator />;
	else if (!plans.length) return <Text>{translate("noPlansMsg")}</Text>;
	else
		return (
			<View>
				<ScrollView horizontal>
					{plans.map((plan, i) => (
						<PlanCard plan={plan} key={i} openSheet={openSheet} />
					))}
				</ScrollView>
			</View>
		);
}
