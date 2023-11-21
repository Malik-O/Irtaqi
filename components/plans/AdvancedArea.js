import { View } from "react-native";
// components
import ScreenText from "../../components/ScreenText";
import AdvancedCard from "./AdvancedCard";
// hooks
import useTranslate from "../../hook/useTranslate";

export default function ({ advancedDays }) {
	const translate = useTranslate();
	if (advancedDays.length)
		return (
			<View>
				<ScreenText variant="headlineLarge">
					{translate("rating")}
				</ScreenText>
				{advancedDays?.map((plan) => (
					<AdvancedCard plan={plan} key={plan.id} />
				))}
			</View>
		);
}
