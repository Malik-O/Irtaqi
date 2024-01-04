import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

export default function DismissKeyboard(Comp = View) {
	function dismiss(onDismiss) {
		Keyboard.dismiss();
		if (onDismiss) onDismiss();
	}
	return ({ children, onDismiss, ...props }) => (
		<TouchableWithoutFeedback
			onPress={() => dismiss(onDismiss)}
			accessible={false}
		>
			<Comp {...{ style: { flex: 1 }, ...props }}>{children}</Comp>
		</TouchableWithoutFeedback>
	);
}
