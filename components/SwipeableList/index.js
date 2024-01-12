import { useCallback, useState, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
// component
import { FlatList } from "react-native";
import Hr from "../Hr";
import Item from "./Item";
import ConfirmationSheet from "./ConfirmationSheet";
import TransportSheet from "./TransportSheet";
import EmptyMessage from "./EmptyMessage";
// styles
import { paddingHorizontal } from "../../styles/layout";
// utils
import fullName from "../../utils/fullName";
import replaceWordsWithList from "../../utils/replaceWordsWithList";
// hook
import useTranslate from "../../hook/useTranslate";

function useSheetActionGenerator({ mutation, hasConfirmation }) {
	const sheetRef = useRef(null);
	const [itemSelected, setItemSelected] = useState(null);
	const [itemIterator, setItemIterator] = useState(null);
	// create generator
	let actionGenerator;
	if (mutation) {
		// firing action in steps
		actionGenerator = async function* () {
			// the first yield doesn't catch any parameter
			yield;
			const { isRemoved, item } = yield;
			if (hasConfirmation) {
				setItemSelected(item);
				sheetRef.current.present();
				var params = yield;
			}
			// do animation then action
			if (isRemoved) isRemoved.value = true;
			await mutation(item, params, sheetRef);
		};
	}

	function createIter() {
		if (!actionGenerator) return;
		return () => {
			const iter = actionGenerator(sheetRef);
			// set the current removable
			setItemIterator(iter);
			// fire the none catching next
			iter.next();
			return iter;
		};
	}

	return {
		itemSelected,
		itemIterator,
		sheetRef,
		createIter,
	};
}

export default function ({
	data,
	onPress,
	hasAvatar,
	onRefresh,
	// empty
	emptyMessage,
	emptyAction,
	// actions
	editAction,
	// transportation
	transportAction,
	transportList,
	emptyTransportMessage,
	transportSheetTitle,
	transportLoading,
	// remove
	removeActionMutation,
	hasConfirmation,
	confirmMessage = "confirmRemoveMsg",
	loading,
}) {
	const [refreshing, setRefreshing] = useState(false);
	const translate = useTranslate();
	// fire remove action according to if it has confirmation
	const {
		itemSelected: itemRemovable,
		itemIterator: removeActionIterator,
		sheetRef: confirmationRef,
		createIter: createRemovableIter,
	} = useSheetActionGenerator({
		hasConfirmation,
		mutation: removeActionMutation,
	});
	// fire transport action according to if it has confirmation
	const {
		itemSelected: userSelected,
		itemIterator: transportActionIterator,
		sheetRef: transportSheetRef,
		createIter: createTransportIterator,
	} = useSheetActionGenerator({
		hasConfirmation: true,
		mutation: transportAction,
	});
	// Confirm Message
	const generateConfirmMessage = useCallback((item) => {
		const message = translate(confirmMessage);
		const name = fullName(item) || item?.title;
		return replaceWordsWithList(message, [name]);
	}, []);

	return (
		<>
			<FlatList
				data={data}
				renderItem={({ item, index }) => {
					let removeActionIterator = createRemovableIter();
					let transportActionIterator = createTransportIterator();
					return (
						<Item
							item={item}
							key={item.id}
							hasBottomDev={index + 1 !== data.length}
							onPress={onPress}
							hasAvatar={hasAvatar}
							hasConfirmation={hasConfirmation}
							// action
							removeActionIterator={removeActionIterator}
							transportActionIterator={transportActionIterator}
							editAction={editAction && editAction(item)}
						/>
					);
				}}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => (
					<Hr
						opacity={0.05}
						style={{
							width: "100%",
							position: "absolute",
							bottom: 0,
							left: paddingHorizontal,
						}}
					/>
				)}
				onRefresh={onRefresh}
				refreshing={refreshing}
			/>
			{/* render empty message with add button */}
			{!data.length && (
				<EmptyMessage
					emptyMessage={emptyMessage}
					emptyAction={emptyAction}
				/>
			)}
			{/* confirmation message sheet with action button */}
			<ConfirmationSheet
				sheetRef={confirmationRef}
				// swipeableRemovableRef={swipeableRemovableRef}
				generateConfirmMessage={generateConfirmMessage}
				itemRemovable={itemRemovable}
				removeActionIterator={removeActionIterator}
				// loading={loading}
			/>
			<TransportSheet
				sheetRef={transportSheetRef}
				title={transportSheetTitle}
				// action={transportAction}
				list={transportList}
				transportActionIterator={transportActionIterator}
				emptyMessage={emptyTransportMessage}
				loading={transportLoading}
			/>
		</>
	);
}
