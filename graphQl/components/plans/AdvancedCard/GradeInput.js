import { useState } from "react";
// hook
import useTranslate from "../../../hook/useTranslate";
// components
import ScreenText from "../../ScreenText";
import { Rating } from "react-native-ratings";

export default function ({ amountDone, allVerses }) {
	const [ratingValue, setRatingValue] = useState(1);
	const translate = useTranslate();
	if (amountDone !== allVerses.length) return;
	return (
		<>
			<ScreenText variant="bodyLarge">
				{translate("grade")}: {ratingValue} /5
			</ScreenText>
			<Rating
				type="star"
				showRating={false}
				startingValue={ratingValue}
				jumpValue={0.5}
				ratingCount={5}
				imageSize={50}
				onSwipeRating={setRatingValue}
				// style
				tintColor="#322F35"
				// tintColor="#E7E0EC"
				// ratingColor="red"
				style={{ transform: [{ scaleX: -1 }] }}
			/>
		</>
	);
}
