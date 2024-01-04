import { useRef, useCallback } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import ScreenView from "../../../../../components/ScreenView";
import HeaderButton from "../../../../../components/HeaderButton";
import AddUserBottomSheet from "../../../../../components/addUserSteps";
import AdminUsersList from "../../../../../components/AdminUsersList";
import SectionHeader from "../../../../../components/AdminUsersList/SectionHeader";
// hook
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import useTranslate from "../../../../../hook/useTranslate";

// resolvers
function resolveRouter(pathname, studentID) {
	return { pathname: `${pathname}/[studentID]`, params: { studentID } };
}
export default function () {
	const translate = useTranslate();
	const { groupID } = useLocalSearchParams();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.find((group) => group.id === groupID);
	// add user sheet
	const addUserSheetRef = useRef(null);
	const { dismissAll } = useBottomSheetModal();
	const openAddUserSheet = useCallback(() => {
		dismissAll();
		addUserSheetRef.current?.present();
	}, []);
	// scroll view props
	// const props = useMemo(
	// 	() => ({
	// 		title: selectedGroup.title,
	// 		back: true,
	// 		more: {
	// 			// icon: "",
	// 			items: [
	// 				{
	// 					title: translate("addUser"),
	// 					onPress: () => addUserSheetRef.current?.present(),
	// 				},
	// 			],
	// 		},
	// 	}),
	// 	[],
	// );
	//
	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: selectedGroup.title,
					// headerRight: () => <MenuButton menu={props.more} />,
					headerLeft: () => <HeaderButton isExists={true} back />,
				}}
			/>
			<ScreenView
				hasScrollView={false}
				paddingTop={false}
				style={{ paddingTop: 15 }}
			>
				{/* Teachers */}
				<SectionHeader
					title={translate("staff")}
					openAddUserSheet={openAddUserSheet}
				/>
				<AdminUsersList
					users={selectedGroup.teachers}
					emptyMessage={[
						translate("noStaffYetMessage"),
						translate("add_teacher"),
					]}
					openAddUserSheet={openAddUserSheet}
				/>
				{/* Students */}
				<SectionHeader
					title={translate("students")}
					openAddUserSheet={openAddUserSheet}
				/>
				<AdminUsersList
					users={selectedGroup.courses[0]?.floatingStudents}
					emptyMessage={[
						translate("noStudentsYetMessage"),
						translate("add_student"),
					]}
					openAddUserSheet={openAddUserSheet}
				/>
				{/* bottom sheets */}
				<AddUserBottomSheet sheetRef={addUserSheetRef} />
			</ScreenView>
		</>
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
