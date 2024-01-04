import { memo, useCallback, forwardRef, useEffect } from "react";
// component
import { TextInput } from "react-native-paper";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";

const BottomSheetTextInputComponent = forwardRef(
	({ onFocus, onBlur, ...rest }, ref) => {
		const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

		useEffect(() => {
			return () => {
				// Reset the flag on unmount
				shouldHandleKeyboardEvents.value = false;
			};
		}, [shouldHandleKeyboardEvents]);

		const handleOnFocus = useCallback(
			(args) => {
				shouldHandleKeyboardEvents.value = true;
				if (onFocus) onFocus(args);
			},
			[onFocus, shouldHandleKeyboardEvents],
		);
		const handleOnBlur = useCallback(
			(args) => {
				shouldHandleKeyboardEvents.value = false;
				if (onBlur) onBlur(args);
			},
			[onBlur, shouldHandleKeyboardEvents],
		);

		return (
			<TextInput
				ref={ref}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				{...rest}
			/>
		);
	},
);

export default memo(BottomSheetTextInputComponent);
