import { memo, useCallback, forwardRef, useEffect } from "react";
// component
import Handle from "./Handle";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
// hook
import useTheme from "../../hook/useTheme";

const BottomSheet = forwardRef(
	({ children, selected = {}, Comp = BottomSheetModal, ...rest }, ref) => {
		const theme = useTheme();
		return (
			<Comp
				ref={ref}
				backgroundStyle={{
					backgroundColor: selected.color || theme.secondary,
				}}
				handleComponent={(params) => Handle({ selected, ...params })}
				{...rest}
			>
				{children}
			</Comp>
		);
	},
);
export default memo(BottomSheet);
// "#009688" ||
