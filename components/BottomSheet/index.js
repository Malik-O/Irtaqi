import { memo, useCallback, forwardRef, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
// component
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Portal } from "react-native-paper";
import Handle from "./Handle";
import Backdrop from "./Backdrop";
// hook
import useTheme from "../../hook/useTheme";

const BottomSheet = forwardRef(
	(
		{
			children,
			selected = {},
			storeAction,
			Comp = BottomSheetModal,
			defaultBackDrop,
			loading,
			...rest
		},
		ref,
	) => {
		const theme = useTheme();
		// handle change sheet
		const handleSheetChange = useCallback((index) => {
			if (index === -1 && storeAction) storeAction.resetFrom();
		}, []);

		return (
			<>
				<Portal>
					<View
						style={[
							{
								backgroundColor: "rgba(255, 255, 255, 0.3)",
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								display: loading ? "block" : "none",
							},
						]}
					>
						<ActivityIndicator size="large" />
					</View>
				</Portal>
				<Comp
					ref={ref}
					backgroundStyle={{
						backgroundColor: selected.color || theme.secondary,
					}}
					onChange={handleSheetChange}
					handleComponent={(params) =>
						Handle({ selected, ...params })
					}
					backdropComponent={(props) =>
						defaultBackDrop && Backdrop(props, ref)
					}
					{...rest}
				>
					{children}
				</Comp>
			</>
		);
	},
);
export default memo(BottomSheet);
// "#009688" ||
