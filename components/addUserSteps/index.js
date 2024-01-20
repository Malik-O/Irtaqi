import { useCallback, useState, useMemo } from "react";
import { ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
import { addUserActions } from "../../store/addUser";
// components
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Stepper from "../Stepper";
import BottomSheet from "../BottomSheet";
import DismissKeyboard from "../DismissKeyboard";
import ScreenText from "../ScreenText";
// hook
import useCreateUser from "../../hook/user/useCreateUser";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// styles
// steps components
import RoleStep from "./RoleStep";
import NameStep from "./NameStep";
import NationalIDStep from "./NationalIDStep";
import ContactStep from "./ContactStep";
import AddToGroupStep from "./AddToGroupStep";

// create a view component with dismiss hook
const DismissKeyboardView = DismissKeyboard();

export default function ({ sheetRef, isLoading }) {
	const translate = useTranslate();
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [
		{ ele: RoleStep, isStepValid: "RoleStep_isValid" },
		{ ele: AddToGroupStep, isStepValid: "AddToGroupStep_isValid" },
		{ ele: NameStep, isStepValid: "NameStep_isValid" },
		// { ele: GenderStep, isStepValid: "GenderStep_isValid" },
		{ ele: NationalIDStep, isStepValid: "NationalIDStep_isValid" },
		{ ele: ContactStep, isStepValid: "ContactStep_isValid" },
	];
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const { mutationAction, loading } = useCreateUser(sheetRef);
	// callbacks
	const snapPoints = useMemo(() => ["90%"], []);
	// Bottom Sheet loading style
	const contentStyle = useAnimatedStyle(
		() => ({ display: isLoading?.value ? "none" : "flex" }),
		[],
	);
	const indicatorStyle = useAnimatedStyle(
		() => ({ display: isLoading?.value ? "flex" : "none" }),
		[],
	);

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			storeAction={addUserActions}
			onChange={(index) => index === -1 && setActiveIndex(0)}
			loading={loading}
			enableDismissOnClose
		>
			<BottomSheetView style={{ flex: 1 }}>
				<DismissKeyboardView>
					<Animated.View style={indicatorStyle}>
						<ActivityIndicator />
					</Animated.View>
					<Animated.View style={contentStyle}>
						<Stepper
							title={translate("addUser", true)}
							steps={steps}
							activeIndex={activeIndex}
							setActiveIndex={setActiveIndex}
							submitEvent={{ mutationAction, loading }}
							formData={formData}
						/>
					</Animated.View>
				</DismissKeyboardView>
			</BottomSheetView>
		</BottomSheet>
	);
}
