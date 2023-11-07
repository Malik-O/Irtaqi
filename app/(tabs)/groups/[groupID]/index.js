import { Button } from "react-native";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import Card from "../../../../components/Card";
import ScreenView from "../../../../components/ScreenView";
// resolvers
function resolveRouter(pathname, courseID) {
	return { pathname: `${pathname}/[courseID]`, params: { courseID } };
}

export default function id() {
	const { groupID } = useLocalSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	return (
		<ScreenView>
			<Button
				onPress={() => router.push(`groups/${groupID}/attendance`)}
				title="attendance"
			/>
			{selectedGroup.courses.map((item, i) => (
				<Card
					item={item}
					key={i}
					href={resolveRouter(pathname, item.id)}
				/>
			))}
		</ScreenView>
	);
}
