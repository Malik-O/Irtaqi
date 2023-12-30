import { View } from "react-native";
// components
import ScreenText from "../../components/ScreenText";
import AdvancedCard from "./AdvancedCard";
// hooks
import useTranslate from "../../hook/useTranslate";
//
import { paddingHorizontal } from "../../styles/layout";

export default function ({ advancedDays }) {
	const translate = useTranslate();
	if (advancedDays.length)
		return (
			<View style={{ paddingHorizontal }}>
				<ScreenText variant="headlineLarge">
					{translate("rating")}
				</ScreenText>
				{advancedDays?.map((plan, i) => (
					<AdvancedCard plan={plan} key={i} />
				))}
			</View>
		);
}
