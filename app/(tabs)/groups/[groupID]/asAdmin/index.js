import { View, TouchableOpacity } from "react-native";
import {
	useLocalSearchParams,
	usePathname,
	useRouter,
	Stack,
} from "expo-router";
import Animated from "react-native-reanimated";
// redux
import { useSelector, useDispatch } from "react-redux";
// components
import { AnimatedFAB } from "react-native-paper";
import Card from "../../../../../components/Card";
import ScreenView from "../../../../../components/ScreenView";
import ScreenText from "../../../../../components/ScreenText";
import CoolScrollView from "../../../../../components/CoolScrollView";
import HeaderButton from "../../../../../components/HeaderButton";
import MenuButton from "../../../../../components/CoolScrollView/MenuButton";
import FBA from "../../../../../components/FBA";
// hook
import useTranslate from "../../../../../hook/useTranslate";
import useTheme from "../../../../../hook/useTheme";
// paper
import {
	Button as PaperButton,
	Dialog,
	Portal,
	PaperProvider,
	Text as PaperText,
} from "react-native-paper";
import { useEffect } from "react";

// resolvers
function fullName(entity) {
	return `${entity?.first_name} ${entity?.parent_name || ""} ${
		entity?.rest_of_name || ""
	}`;
}
function resolveRouter(pathname, studentID) {
	return { pathname: `${pathname}/[studentID]`, params: { studentID } };
}

function StudentsList({ students }) {
	const translate = useTranslate();
	const theme = useTheme();
	if (students?.length)
		return (
			<Animated.FlatList
				style={[{ marginBottom: 80 }]}
				data={students}
				scrollEventThrottle={16}
				keyExtractor={(_, i) => i}
				renderItem={({ item, index }) => {
					return (
						<Card
							key={index}
							item={{ ...item, title: fullName(item) }}
						/>
					);
				}}
			/>
		);
	else
		return (
			<View style={{ marginTop: 20 }}>
				<ScreenText style={{ textAlign: "center" }} variant="bodyLarge">
					{translate("noStudentsYetMessage")}
				</ScreenText>
				<TouchableOpacity onPress={() => {}}>
					<ScreenText
						style={{
							textAlign: "center",
							marginTop: 10,
							color: theme.reverse.primary,
						}}
						variant="bodyLarge"
					>
						{translate("add_student")}
					</ScreenText>
				</TouchableOpacity>
			</View>
		);
}

export default function () {
	const translate = useTranslate();
	const pathname = usePathname();
	const router = useRouter();
	const { groupID } = useLocalSearchParams();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	// scroll view props
	const props = {
		title: selectedGroup.title,
		back: true,
		more: {
			// icon: "",
			items: [
				{
					title: translate("addUser"),
					onPress: () => {
						router.push(`${pathname}/addUser`);
					},
				},
			],
		},
	};
	return (
		<ScreenView hasScrollView={false} paddingTop={false}>
			<Stack.Screen
				options={{
					headerTitle: selectedGroup.title,
					headerRight: () => <MenuButton menu={props.more} />,
					headerLeft: () => <HeaderButton isExists={true} back />,
				}}
			/>
			<StudentsList
				students={selectedGroup.courses[0]?.floatingStudents}
			/>
		</ScreenView>
	);
}

// const groups = [
// 	{
// 		__typename: "Group",
// 		id: "650552241bac85c6cc903432",
// 		as: "organization_owner",
// 		title: "التميز",
// 		courses: [
// 			{
// 				__typename: "Course",
// 				id: "651438b01ffb2f1f855acff7",
// 				title: "قران",
// 				floatingStudents: [
// 					{
// 						__typename: "User",
// 						id: "6514396c1ffb2f1f855acff8",
// 						first_name: "محمد علاء",
// 					},
// 				],
// 				subgroups: [
// 					{
// 						__typename: "Subgroup",
// 						id: "65143cf51ffb2f1f855acffb",
// 						title: "الاعراف",
// 						student_ids: ["6514396c1ffb2f1f855acff8"],
// 						students: [
// 							{
// 								__typename: "User",
// 								id: "6514396c1ffb2f1f855acff8",
// 								first_name: "محمد علاء",
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		__typename: "Group",
// 		id: "6506f351d660b43e1e46d05b",
// 		as: "organization_owner",
// 		title: "الاشبال",
// 		courses: [],
// 	},
// 	{
// 		__typename: "Group",
// 		id: "6506f5bfd660b43e1e46d05e",
// 		as: "organization_owner",
// 		title: "الذهبي",
// 		courses: [],
// 	},
// ];
