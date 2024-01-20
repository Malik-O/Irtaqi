import { memo, useCallback, forwardRef } from "react";
import { View, ActivityIndicator } from "react-native";
// redux
import { useDispatch } from "react-redux";
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
			Comp = BottomSheetModal,
			defaultBackDrop,
			loading,
			// on change
			storeAction,
			onChange,
			// big button
			bigButtonTitle,
			bigButtonOnPress,
			...rest
		},
		ref,
	) => {
		const dispatch = useDispatch();
		const theme = useTheme();
		// handle change sheet
		const handleSheetChange = useCallback(
			(index) => {
				onChange && onChange(index);
				if (index === -1 && storeAction)
					dispatch(storeAction.resetFrom());
			},
			[storeAction],
		);

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
						Handle({
							bigButtonOnPress,
							bigButtonTitle,
							selected,
							...params,
						})
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
